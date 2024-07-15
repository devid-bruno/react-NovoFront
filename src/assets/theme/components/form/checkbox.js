/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// Vision UI Dashboard PRO React base styles
import borders from "../../base/borders";
import colors from "../../base/colors";

// Vision UI Dashboard PRO React helper functions
import pxToRem from "../../functions/pxToRem";
import linearGradient from "../../functions/linearGradient";

const { borderWidth, borderColor } = borders;
const { transparent, gradients, info, white, grey } = colors;

export default {
  styleOverrides: {
    root: {
      width: pxToRem(20),
      height: pxToRem(20),
      marginRight: pxToRem(6),
      padding: 0,
      color: grey[700],
      border: `${borderWidth[1]} solid ${borderColor}`,
      borderRadius: pxToRem(5.6),
      transition: "all 250ms ease",

      // "&:hover": {
      //   backgroundColor: transparent.main,
      // },

      // "& .MuiSvgIcon-root": {
      //   fill: white.main,
      // },
    },

    // colorPrimary: {
    //   backgroundColor: transparent.main,

    //   "&.Mui-checked": {
    //     backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
    //       gradients.dark.main,
    //       gradients.dark.state
    //     )}`,
    //     borderColor: gradients.dark.main,
    //   },

    //   "&:hover": {
    //     backgroundColor: transparent.main,
    //   },
    // },

    // colorSecondary: {
    //   backgroundColor: transparent.main,

    //   "&.Mui-checked": {
    //     backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
    //       gradients.dark.main,
    //       gradients.dark.state
    //     )}`,
    //     borderColor: gradients.dark.main,
    //   },

    //   "&:hover": {
    //     backgroundColor: transparent.main,
    //   },
    // },
  },
};
