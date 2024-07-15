import React from 'react';
import PropTypes from 'prop-types';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiDropzone from 'components/VuiDropzone';

function Archive({ onFileAdded }) {
  const handleFileAdded = (file) => {
    // Emitir evento para o componente pai (FiltroEmLote) quando um arquivo for adicionado
    if (onFileAdded) {
      onFileAdded(file);
    }
  };

  return (
    <VuiBox>
      <VuiTypography variant="h5" color="white">
        Base
      </VuiTypography>
      <VuiBox mt={3}>
        <VuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <VuiTypography component="label" variant="caption" fontWeight="bold" color="white">
            Selecione ou arraste a sua base para ser processado.
          </VuiTypography>
        </VuiBox>
        <VuiDropzone
          options={{
            addRemoveLinks: true,
            maxFiles: 1,
            acceptedFiles: '.txt',
          }}
          onFileAdded={handleFileAdded}
        />
      </VuiBox>
    </VuiBox>
  );
}

Archive.propTypes = {
  onFileAdded: PropTypes.func,
};

export default Archive;
