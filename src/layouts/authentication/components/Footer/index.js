import Grid from "@mui/material/Grid";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer({ full }) {
  return (
    <VuiBox
      component="footer"
      py={6}
      sx={({ breakpoints }) => ({
        maxWidth: full ? "100%" : "450px",
        [breakpoints.down("xl")]: {
          maxWidth: full ? "100%" : "400px",
        },
      })}
    >
      <Grid
        container
        justifyContent={{ xs: "center", lg: full ? "space-between" : "center" }}
        sx={({ breakpoints }) => ({
          maxWidth: full ? "100%" : "450px",
          [breakpoints.down("xl")]: {
            maxWidth: full ? "100%" : "400px",
          },
        })}
      >
        <Grid item xs={full ? 12 : 12} lg={full ? 6 : 12} sx={{ textAlign: "center" }}>
          <VuiTypography
            variant="button"
            sx={{ textAlign: "center", fontWeight: "400 !important" }}
            color="white"
          >
            @ 2024 by{" "}
            <VuiTypography
              component="a"
              variant="button"
              href="#"
              sx={{ textAlign: "center", fontWeight: "500 !important" }}
              color="white"
              mr="2px"
            >
              Doka! 🏴‍☠️
            </VuiTypography>
          </VuiTypography>
        </Grid>
      </Grid>
    </VuiBox>
  );
}

export default Footer;
