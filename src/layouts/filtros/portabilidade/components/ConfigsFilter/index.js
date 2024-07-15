import { useState } from "react";

import Card from "@mui/material/Card";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";

function ConfigsFilter() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [mails, setMails] = useState(false);

  const [design, setDesign] = useState(false);
  const [development, setDevelopment] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleSetDesign = () => setDesign(!design);
  const handleSetDevelopment = () => setDevelopment(!development);
  const handleSetMarketing = () => setMarketing(!marketing);

  const customButtonStyles = ({
    functions: { pxToRem },
    borders: { borderWidth },
    palette: { transparent, info },
  }) => ({
    width: pxToRem(150),
    height: pxToRem(150),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

    "&:hover": {
      backgroundColor: `${info.main} !important`,
      border: `${borderWidth[2]} solid ${info.main} !important`,
    },
  });

  const lineCount = localStorage.getItem("lineCount");

  return (
    <VuiBox>
      <VuiBox width="80%" textAlign="center" mx="auto" mb={4}>
        <VuiBox mb={1}>
          <VuiTypography variant="lg" fontWeight="bold" color="white">
            Arquivo importado possui {lineCount} linhas.
          </VuiTypography>
        </VuiBox>
        <VuiTypography variant="button" fontWeight="regular" color="text">
          Por favor, selecione as opções para o filtro.
        </VuiTypography>
      </VuiBox>
      <VuiBox mt={2}>
      <Card sx={{ minHeight: "490px" }}>
      <VuiBox mb="26px">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          Configuração do filtro
        </VuiTypography>
      </VuiBox>
      <VuiBox lineHeight={1.25}>
        <VuiTypography
          variant="xxs"
          fontWeight="medium"
          mb="20px"
          color="text"
          textTransform="uppercase"
        >
          Portabilidade
        </VuiTypography>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch color="info" checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Separar por Operadora
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={answersPost}
              onChange={() => setAnswersPost(!answersPost)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Separar por Portado e Não Portados
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              sx={{ background: "#1B1F3D", color: "#fff" }}
              color="info"
              checked={mentionsMe}
              onChange={() => setMentionsMe(!mentionsMe)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Adicionar data da portabilidade se for Portado
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox mb="6px">
          <VuiTypography variant="xxs" fontWeight="medium" color="text" textTransform="uppercase">
            WhatsApp
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={newLaunches}
              onChange={() => setNewLaunches(!newLaunches)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Puxar somente com WhatsApp
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={productUpdate}
              onChange={() => setProductUpdate(!productUpdate)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Puxar Somente Sem WhatsApp
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiSwitch
              color="info"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
          </VuiBox>
          <VuiBox width="80%" ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Puxar todos
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
      </VuiBox>
    </VuiBox>
  );
}

export default ConfigsFilter;
