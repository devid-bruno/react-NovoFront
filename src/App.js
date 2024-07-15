import { useState, useEffect, useMemo } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import VuiBox from "./components/VuiBox";
import Sidenav from "./examples/Sidenav";
import Configurator from "./examples/Configurator";

import theme from "./assets/theme";
import themeRTL from "./assets/theme/theme-rtl";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import routes from "./routes";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "./context";

import PrivateRoute from './PrivateRoute';

import "./assets/theme/base/plugins.css";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const filterMenuItems = (menuItems, userRoleId) => {
    return menuItems
      .map(item => {
        if (item.collapse) {
          const filteredCollapse = filterMenuItems(item.collapse, userRoleId);
          if (filteredCollapse.length > 0) {
            return { ...item, collapse: filteredCollapse };
          }
          return null;
        }

        if (item.private) {
          if (item.admin && userRoleId !== '1') return null;
          if (item.user && userRoleId !== '2') return null;
        }

        return item;
      })
      .filter(item => item !== null);
  };

  const userRoleId = localStorage.getItem('role'); 

  const filteredRoutes = filterMenuItems(routes, userRoleId);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.private) {
          return (
            <Route
              path={route.route}
              element={<PrivateRoute component={route.component} />}
              key={route.key}
            />
          );
        } else {
          return (
            <Route
              path={route.route}
              element={<route.component />}
              key={route.key}
            />
          );
        }
      }

      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={({ palette: { info } }) => ({ cursor: "pointer", backgroundColor: info.main })}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brandName="VISION UI PRO"
              routes={filteredRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/* <Configurator />
            {configsButton} */}
          </>
        )}
        {/* {layout === "vr" && <Configurator />} */}
        <Routes>
          {getRoutes(filteredRoutes)}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brandName="VISION UI PRO"
            routes={filteredRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator />
          {configsButton} */}
        </>
      )}
      {/* {layout === "vr" && <Configurator />} */}
      <Routes>
        {getRoutes(filteredRoutes)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
