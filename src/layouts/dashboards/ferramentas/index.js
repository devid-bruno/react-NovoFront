import { useState, useHistory  } from "react";
import { Redirect } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiAlert from "components/VuiAlert";
import VuiButton from 'components/VuiButton';
import VuiInput from "components/VuiInput";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import VuiDropzone from 'components/VuiDropzone';
import { requestAddPhoneList } from "../../../services/services";

import CircularProgress from '@mui/material/CircularProgress';


function AddPhone() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [phone, setPhone] = useState('');
  const [interval, setInterval] = useState('');
  const [redirect, setRedirect] = useState(false);
  const accessToken = localStorage.getItem('token');

  const handleFileAdded = (file) => {
    setSelectedFile(file); 
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  
  const handleImportClick = async () => {
    console.log('Iniciando importação...');

    if (!selectedFile || !accessToken || !phone || !interval) {
      console.error('Nenhum arquivo, número de telefone ou intervalo selecionado ou token de acesso inválido.');
      return;
    }


    try {
      setLoading(true); 
      await requestAddPhoneList(selectedFile, accessToken);

      setRedirect(true);

    } catch (error) {
      console.log(error);
      setError('Erro ao enviar o arquivo. Verifique sua conexão ou tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };


  if (redirect) {
    return <Redirect to="/adicionar-telefone" />;
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
                  Adicionar Telefone na lista
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

                <VuiBox p={1}>
                <VuiInput
                    placeholder="Telefone que deseja adicionar na lista"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </VuiBox>
                <VuiBox p={1}>
                <VuiInput
                    placeholder="A cada..."
                    value={interval}
                    onChange={handleIntervalChange}
                  />
                </VuiBox>

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


export default AddPhone;
