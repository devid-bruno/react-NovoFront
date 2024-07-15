import { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import VuiInput from "components/VuiInput";

import { requestOnlyPhone } from "../../../services/services";

function filtroindividual() {
    const [tel, setTel] = useState('');
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const handlePortabilidade = async (e) => {
      e.preventDefault();
      try {
        const portabilidadeData = await requestOnlyPhone(tel, accessToken); 
        if (portabilidadeData.status === 200) {
          alert(JSON.stringify(portabilidadeData.data, null, 2));
        } else {
          alert(JSON.stringify(portabilidadeData.data, null, 2));
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
        } else {
          setError('Telefone Inválido');
        }
      }
    }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox pt={3} pb={8}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <VuiBox mt={6} mb={1} textAlign="center">
              <VuiBox mb={1}>
                <VuiTypography variant="h3" fontWeight="bold" color="white">
                  Consultar Número Individualmente
                </VuiTypography>
              </VuiBox>
              <VuiTypography variant="button" fontWeight="regular" color="white">
                Digite o número que deseja consultar.
              </VuiTypography>
            </VuiBox>
            <Card>
            <VuiBox p={2}>
              <VuiBox>
              <VuiInput
                type="text"
                placeholder="Telefone"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              </VuiBox>
            </VuiBox>
            <VuiButton variant="contained" color="info" onClick={handlePortabilidade}>Consultar</VuiButton>
            </Card>
          </Grid>
        </Grid>
      </VuiBox>
      {error && (
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              <strong>{error}</strong>  
            </VuiTypography>
          </VuiBox>
        )}
      <Footer />
    </DashboardLayout>
  );
}

export default filtroindividual;
