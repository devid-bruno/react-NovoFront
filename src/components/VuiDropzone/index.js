import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import VuiBox from "components/VuiBox";
import VuiDropzoneRoot from "components/VuiDropzone/VuiDropzoneRoot";

function VuiDropzone({ options, onFileAdded }) {
  const dropzoneRef = useRef(null);
  const dzInstance = useRef(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    if (!dzInstance.current) {
      dzInstance.current = new Dropzone(dropzoneRef.current, { ...options });

      dzInstance.current.on('addedfile', (file) => {
        if (onFileAdded) {
          onFileAdded(file);
        }
      });
    }

    return () => {};
  }, [options, onFileAdded]);

  return (
    <VuiDropzoneRoot
      component="form"
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
    >
      <VuiBox className="fallback">
        <VuiBox component="input" name="file" type="file" multiple />
      </VuiBox>
    </VuiDropzoneRoot>
  );
}

VuiDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  onFileAdded: PropTypes.func,
};

export default VuiDropzone;
