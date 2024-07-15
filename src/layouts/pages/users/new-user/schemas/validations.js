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

import * as Yup from "yup";
import checkout from "layouts/pages/users/new-user/schemas/form";

const {
  formField: { name, payment, email, setor, password, repeatPassword },
} = checkout;

export default [
  Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [payment.name]: Yup.string().required(payment.errorMsg),
    [setor.name]: Yup.string().required(setor.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    // [password.name]: Yup.string().required(password.errorMsg).min(6, password.invalidMsg),
    // [password.name]: Yup.string().required(password.errorMsg).min(6, password.invalidMsg),
    // [repeatPassword.name]: Yup.string()
    //   .required(repeatPassword.errorMsg)
    //   .oneOf([Yup.ref("password"), null], repeatPassword.invalidMsg),
  })
];
