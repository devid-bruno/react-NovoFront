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

import checkout from "layouts/pages/users/user-new/schemas/form";

const {
  formField: {
    name,
    payment,
    setor,
    email,
    password,
    repeatPassword,
  },
} = checkout;

export default {
  [name.name]: "",
  [payment.name]: "",
  [setor.name]: "",
  [email.name]: "",
  [password.name]: "",
  [repeatPassword.name]: "",
};
