import { useState } from "react";

import { Formik, Form } from "formik";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import UserInfo from "layouts/pages/users/user-new/components/UserInfo";

import validations from "layouts/pages/users/user-new/schemas/validations";
import form from "layouts/pages/users/user-new/schemas/form";
import initialValues from "layouts/pages/users/user-new/schemas/initialValues";

import { createUser } from "../../../../services/services"

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    default:
      return null;
  }
}

export default function NewUser() {
  const accessToken = localStorage.getItem('token');
  const [activeStep, setActiveStep] = useState(0);
  const { formId, formField } = form;
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const currentValidation = validations[activeStep];


  const submitForm = async (values, actions) => {
    try{
      const createUsers = await createUser(accessToken, values, actions);

      if(createUsers){
        actions.setSubmitting(false);
        actions.resetForm();
        setActiveStep(0);
      }
    }catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Formik
              enableReinitialize
              initialValues={initialFormValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue, setFieldTouched }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <VuiBox>
                      <VuiBox>
                      {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                          setFieldValue,
                          setFieldTouched,
                        })}
                        <VuiBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          <VuiButton
                             type="submit"
                             variant="contained"
                             color="primary"
                             disabled={isSubmitting}
                          >
                            Salvar
                          </VuiButton>
                        </VuiBox>
                      </VuiBox>
                    </VuiBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

