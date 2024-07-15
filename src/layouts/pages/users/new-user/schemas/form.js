export default {
  formId: "new-user-form",
  formField: {
    name: {
      name: "name",
      label: "Nome",
      type: "text",
      placeholder: "Nome",
      errorMsg: "First name is required.",
    },
    payment: {
      name: "payment_id",
      label: "pagamento",
      type: "text",
      placeholder: "Selecione Status de Pagamento",
      errorMsg: "Last name is required.",
    },
    setor: {
      name: "role_id",
      label: "setor",
      type: "text",
      placeholder: "Selecione Setor do usuário.",
      errorMsg: "Last name is required.",
    },
    email: {
      name: "email",
      label: "email",
      type: "email",
      placeholder: "eg. vision@dashboard.come",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    // password: {
    //   name: "password",
    //   label: "password",
    //   type: "password",
    //   placeholder: "******",
    //   errorMsg: "Password is required.",
    //   invalidMsg: "Your password should be more than 6 characters.",
    // },
    // repeatPassword: {
    //   name: "repeatPassword",
    //   label: "repeat password",
    //   type: "password",
    //   placeholder: "******",
    //   errorMsg: "Password is required.",
    //   invalidMsg: "Your password doesn't match.",
    // }
  },
};
