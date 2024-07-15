import { useState, useHistory  } from "react";
import { Redirect } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiAlert from "components/VuiAlert";
import VuiButton from 'components/VuiButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import VuiDropzone from 'components/VuiDropzone';
import { requestPhones } from "../../../services/services";

import CircularProgress from '@mui/material/CircularProgress';


function FiltroEmLote() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const accessToken = localStorage.getItem('token');

  const handleFileAdded = (file) => {
    setSelectedFile(file); 
  };

  const handleImportClick = async () => {
    console.log('Iniciando importação...');

    if (!selectedFile || !accessToken) {
      console.error('Nenhum arquivo selecionado ou token de acesso inválido.');
      return;
    }

    try {
      setLoading(true); 
      await requestPhones(selectedFile, accessToken);

      setRedirect(true);

    } catch (error) {
      console.log(error);
      setError('Erro ao enviar o arquivo. Verifique sua conexão ou tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };


  if (redirect) {
    return <Redirect to="/dashboards/listas" />;
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
                  Consultar Número em Lote
                </VuiTypography>
              </VuiBox>
              <VuiTypography variant="button" fontWeight="regular" color="white">
                Importe o arquivo que deseja processar.
              </VuiTypography>
            </VuiBox>

            <Card>
              <VuiBox p={2}>
                {loading ? (
                  <VuiBox mt={3} width="100%" display="flex" justifyContent="center">
                    <CircularProgress color="info" />
                  </VuiBox>
                ) : (
                  <VuiDropzone
                    options={{
                      addRemoveLinks: true,
                      maxFiles: 1,
                      acceptedFiles: '.txt',
                    }}
                    onFileAdded={handleFileAdded}
                    files={[selectedFile]}
                  />
                )}
                <VuiBox mt={3} width="100%" display="flex" justifyContent="space-between">
                  <VuiBox />
                  <VuiButton variant="gradient" color="info" onClick={handleImportClick}>
                    Importar
                  </VuiButton>
                </VuiBox>
              </VuiBox>
            </Card>
          </Grid>
        </Grid>
      </VuiBox>
      {error && (
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
          <VuiAlert color="error" dismissible>{error}</VuiAlert>
          </VuiTypography>
        </VuiBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}


export default FiltroEmLote;
