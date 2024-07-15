import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiAlert from "components/VuiAlert";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";

import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { getUsers, updateUser, DeleteUser } from "../../../services/services";

import validations from "layouts/pages/users/new-user/schemas/validations";
import form from "layouts/pages/users/new-user/schemas/form";
import initialValues from "layouts/pages/users/new-user/schemas/initialValues";

import UserInfo from "layouts/pages/users/new-user/components/UserInfo";


export default function Users() {
  const accessToken = localStorage.getItem('token');
  const [data, setData] = useState({ columns: [], rows: [] });
  const [menu, setMenu] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [open, setOpen] = useState(false);

  const mapPaymentStatus = (status) => {
    switch(status) {
      case "pago":
        return 1;
      case "pendente":
        return 2;
      default:
        return "";
    }
  };

  const mapRoleStatus = (statusRole) => {
    switch(statusRole) {
      case "Administrador":
        return 1;
      case "Cliente":
        return 2;
      default:
        return "";
    }
  };
  

  useEffect(() => {
    if (selectedUser) {
      setInitialFormValues({
        ...initialValues,
        [formField.name.name]: selectedUser.name || "",
        [formField.payment.name]: mapPaymentStatus(selectedUser.payment),
        [formField.setor.name]: mapRoleStatus(selectedUser.role_id) || "",
        [formField.email.name]: selectedUser.email || "",
      });
    }
  }, [selectedUser]);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const Toredirect = () => setredirect (
    <Redirect from="*" to="/applications/kanban" />
  )

  const deleteUsers = async (user) => {
    try {
      const deleteUser = await DeleteUser(user.identify, accessToken);
      if(deleteUser){
        actions.setSubmitting(false);
        actions.resetForm();
        setActiveStep(0);
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: processing</MenuItem>
      <MenuItem onClick={closeMenu}>Status: completed</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <VuiTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </VuiTypography>
      </MenuItem>
    </Menu>
  );

  function getStepContent(stepIndex, formData) {
    switch (stepIndex) {
      case 0:
        return <UserInfo formData={formData} />;
      default:
        return null;
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];

  const submitForm = async (values, actions) => {
    try {
      if (selectedUser) {
        const id = selectedUser.identify;
        await updateUser(id, values, accessToken);
      }
      const updatedData = await getUsers(accessToken);
      setData({
        columns: data.columns,
        rows: updatedData.data,
      });
      handleClose();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      actions.setSubmitting(false);
      actions.resetForm();
      setActiveStep(0);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  const renderModal = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
                            {isSubmitting ? "Submitting..." : "Submit"}
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
    </Modal>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers(accessToken);
        setData({
          columns: [
            { Header: "ID", accessor: "identify" },
            { Header: "Nome", accessor: "name" },
            { Header: "E-mail", accessor: "email" },
            {
              Header: "Status Plano",
              accessor: "payment",
              Cell: ({ value }) => {
                let payment;

                if (value === 1) {
                  payment = <StatusCell icon="done" color="success" status="Pago" />;
                } else if (value === 2) {
                  payment = <StatusCell icon="close" color="error" status="Pendente" />;
                } else {
                  payment = <StatusCell icon="close" color="error" status="Cancelado" />;
                }

                return payment;
              }
            },
            {
              Header: "Setor",
              accessor: "role_id",
              Cell: ({ value }) => {
                let payment;

                if (value === 1) {
                  payment = <StatusCell icon="admin_panel_settings" color="light" status="Admin" />;
                } else if (value === 2) {
                  payment = <StatusCell icon="account_circle" color="light" status="Usuário" />;
                } else {
                  payment = <StatusCell icon="close" color="error" status="Cancelado" />;
                }

                return payment;
              }
            },
            {
              Header: "Ações",
              accessor: "id",
              Cell: ({ row }) => {
                const user = row.original;
                return (
                  <VuiBox>
                    <VuiButton
                      color="info"
                      sx={({ breakpoints }) => ({
                        mb: '10px',
                        [breakpoints.up('md')]: {
                          mb: '0px',
                        },
                      })}
                      onClick={() => handleOpen(user)}
                    >
                      Editar
                    </VuiButton>
                    <VuiButton
                      color="error"
                      sx={({ breakpoints }) => ({
                        mb: "10px",
                        [breakpoints.up("md")]: {
                          mb: "0px",
                        },
                      })}
                      type="submit"
                      onClick={() => deleteUsers(user)}
                    >
                      Remover
                    </VuiButton>
                  </VuiBox>
                );
              }
            },
          ],
          rows: data.data,
        });
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox my={3}>
        <VuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
          sx={({ breakpoints }) => ({
            flexDirection: "column",
            [breakpoints.up("md")]: {
              flexDirection: "row",
            },
          })}
        >
          <VuiButton
            color="info"
            sx={({ breakpoints }) => ({
              mb: "10px",
              [breakpoints.up("md")]: {
                mb: "0px",
              },
            })}
            onClick={() => {
              window.location.href = "/#/applications/new-user";
            }}
          >
            Novo Usuário
          </VuiButton>
          <VuiBox display="flex">
            <VuiButton
              variant={menu ? "contained" : "outlined"}
              color="white"
              onClick={openMenu}
              sx={({ palette: { white }, borders: { borderWidth } }) => ({
                background: "transparent !important",
                border: `${borderWidth[1]} solid ${white.main} !important`,
              })}
            >
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </VuiButton>
            {renderMenu}
            {renderModal}
            <VuiBox ml={1}>
              <VuiButton variant="outlined" color="white">
                <Icon>description</Icon>
                &nbsp;export csv
              </VuiButton>
            </VuiBox>
          </VuiBox>
        </VuiBox>
        <Card>
          <DataTable table={data} entriesPerPage={false} canSearch />
        </Card>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}
