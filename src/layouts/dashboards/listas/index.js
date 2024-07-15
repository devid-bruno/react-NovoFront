import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiAlert from "components/VuiAlert";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { filesForUser, DownloadFileForUser, DeleteFileForUser } from "../../../services/services";

export default function Lista() {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [menu, setMenu] = useState(null);
  const [delite, setDelite] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

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

  const progressProcessor = (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
  );

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await filesForUser(accessToken);

      setData({
        columns: [
          { Header: "ID", accessor: "id" },
          {
            Header: "Tipo de Filtro",
            accessor: "upload_type_id",
            Cell: ({ value }) => {
              let upload_type_id;

              if (value === 1) {
                upload_type_id = <StatusCell color="success" status="Portabilidade Numerica" />;
              } else if (value === 2) {
                upload_type_id = <StatusCell color="success" status="WhatsApp" />;
              } else {
                upload_type_id = <StatusCell color="success" status="Inclusão de Telefones" />;
              }

              return upload_type_id;
            }
          },
          { Header: "UUID", accessor: "uuid" },
          {
            Header: "Status",
            accessor: "status",
            Cell: ({ value }) => {
              let status;

              if (value === "completed") {
                status = <StatusCell icon="done" color="success" status="completed" />;
              } else if (value === "processing") {
                status = <StatusCell icon={<CircularProgress size={24} />} color="dark" status="processing" />;
              } else {
                status = <StatusCell icon="close" color="error" status="Canceled" />;
              }

              return status;
            }
          },
          {
            Header: "Ações",
            accessor: "actions",
            Cell: ({ row }) => {
              const { upload_type_id, status } = row.original;

              const renderDownloadButton = () => {
                if (upload_type_id === 1) {
                  return <VuiButton onClick={() => handleDownload(row)} color="success">Baixar</VuiButton>;
                } else if (upload_type_id === 2) {
                  return <VuiButton onClick={() => handleDownloadWpp(row)} color="success">Baixar Wpp</VuiButton>;
                }else if (upload_type_id === 3) {
                  return <VuiButton onClick={() => handleDownloadInclusaoTelefones(row)} color="success">Baixar</VuiButton>;
                }
              };

              return (
                <div>
                  {status === 'completed' ? (
                    renderDownloadButton()
                  ) : (
                    <VuiButton onClick={() => handleCancel(row)} color="warning">Cancelar</VuiButton>
                  )}
                  <VuiButton onClick={() => handleDelete(row)} color="error">Excluir</VuiButton>
                </div>
              );
            }
          }
        ],
        rows: response.uploads,
      });
    } catch (error) {
      console.error('Erro ao buscar uploads:', error);
    }
  };

  // Função para atualizar o status dos uploads
  const updateStatus = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await filesForUser(accessToken);

      setData(prevData => ({
        ...prevData,
        rows: prevData.rows.map(row => {
          const updatedRow = response.uploads.find(upload => upload.uuid === row.uuid);
          return updatedRow ? { ...row, status: updatedRow.status } : row;
        })
      }));
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // Configurar atualização periódica para o status
    const interval = setInterval(() => {
      updateStatus();
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  const handleDownload = async (row) => {
    try {
      const accessToken = localStorage.getItem('token');
      const download = await DownloadFileForUser(accessToken, row.original.uuid);
      const textContent = download.map(item => {
        return `${item['operadora']}, ${item['portado'] ? 'Sim' : 'Não' }, ${item['data_portabilidade']}, ${item['numero_requisitado']}, ${item['nome_operadora']}`;
      }).join("\n");

      const totalLines = download.length;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `Consultado[${totalLines}] Números.txt`;
      downloadLink.click();
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };

  const handleDownloadWpp = async (row) => {
    try {
      const accessToken = localStorage.getItem('token');
      const download = await DownloadFileForUser(accessToken, row.original.uuid);
      const textContent = download.map(item => {
        return `${item['numero_consultado']}, ${item['codigo_operadora']}, ${item['portabilidade'] ? 'Sim' : 'Não' }, ${item['data_portabilidade']}, ${item['whatsapp']}`;
      }).join("\n");

      const totalLines = download.length;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `Consultado[${totalLines}] Números.txt`;
      downloadLink.click();
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };
  const handleDownloadInclusaoTelefones = async (row) => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await DownloadFileForUser(accessToken, row.original.uuid);
  
      // Supondo que 'response' seja um Blob ou similar
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'ListaInclusaTelefone.txt'; 
      downloadLink.click();
  
      // Limpeza do URL do objeto
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };
  

  const handleCancel = async (row) => {
    console.log("Cancelar processamento");
  };

  const handleDelete = async (row) => {
    try {
      const accessToken = localStorage.getItem('token');
      await DeleteFileForUser(accessToken, row.original.uuid);
      setDelite("Arquivo excluído com sucesso");
      // Atualiza a lista de uploads após a exclusão
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir o arquivo:', error);
      setDelite("Erro ao excluir o arquivo");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <VuiTypography variant="h5" component="div">
              Lista de Uploads
            </VuiTypography>
            <VuiButton variant="contained" color="primary" onClick={openMenu}>
              Filtrar
            </VuiButton>
            {renderMenu}
          </VuiBox>
          <VuiBox px={2} py={2}>
            <DataTable
              table={data}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </VuiBox>
          {delite && (
            <VuiBox p={2}>
              <VuiAlert color="success">{delite}</VuiAlert>
            </VuiBox>
          )}
        </Card>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}
