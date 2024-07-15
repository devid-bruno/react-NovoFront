import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSelect from "components/VuiSelect";
import FormField from "layouts/pages/users/user-new/components/FormField";

import { ErrorMessage, Field } from "formik";

function UserInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { name, payment, setor, email, password, repeatPassword } = formField;
  const { name: nameV, payment_id: paymentV, role_id: setorV, email: emailV, password: passwordV , repeatPassword: repeatPasswordV } = values;

  const paymentOptions = [
    { value: 1, label: "Pago" },
    { value: 2, label: "Pendente" },
  ];

  const SetorOptions = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Cliente" },
  ];

  const selectedPaymentOption = paymentOptions.find(option => option.value === paymentV) || null;
  const selectedSetorOption = SetorOptions.find(option => option.value === setorV) || null;

  return (
    <VuiBox>
      <VuiBox lineHeight={0} display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Novo Usuário
        </VuiTypography>
        <VuiTypography variant="button" fontWeight="regular" color="text">
          Preencha as informações para cadastro do novo usuário.
        </VuiTypography>
      </VuiBox>
      <VuiBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={name.label}
              name={name.name}
              type={name.type}
              value={nameV}
              placeholder={name.placeholder}
              error={errors.name && touched.name}
              success={nameV.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <VuiTypography
              component="label"
              variant="caption"
              color="white"
              fontWeight="bold"
              textTransform="capitalize"
            >
              Pagamento
            </VuiTypography>
            <VuiSelect
              placeholder={payment.placeholder}
              options={paymentOptions}
              name="payment_id"
              value={selectedPaymentOption}
              onChange={(option) => setFieldValue("payment_id", option.value)}
              onBlur={() => formData.setFieldTouched("payment_id", true)}
              error={errors.payment_id && touched.payment_id}
              helperText={errors.payment_id && touched.payment_id && errors.payment_id}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
          <VuiTypography
              component="label"
              variant="caption"
              color="white"
              fontWeight="bold"
              textTransform="capitalize"
            >
              Setor
            </VuiTypography>
          <VuiSelect
              placeholder={setor.placeholder}
              options={SetorOptions}
              name={setor.name}
              value={selectedSetorOption}
              onChange={(option) => setFieldValue("role_id", option.value)}
              onBlur={() => formData.setFieldTouched("role_id", true)}
              error={errors.role_id && touched.role_id}
              helperText={errors.role_id && touched.role_id && errors.role_id}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              label={email.label}
              name={email.name}
              type={email.type}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={password.label}
              name={password.name}
              type={password.type}
              value={passwordV}
              placeholder={password.placeholder}
              error={errors.password && touched.password}
              success={passwordV.length > 0 && !errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={repeatPassword.label}
              name={repeatPassword.name}
              type={repeatPassword.type}
              value={repeatPasswordV}
              placeholder={repeatPassword.placeholder}
              error={errors.repeatPassword && touched.repeatPassword}
              success={repeatPasswordV.length > 0 && !errors.repeatPassword}
            />
          </Grid>
        </Grid>
      </VuiBox>
    </VuiBox>
  );
}

UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
