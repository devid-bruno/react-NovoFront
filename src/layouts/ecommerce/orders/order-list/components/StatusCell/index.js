import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function StatusCell({ icon, color, status }) {
  return (
    <Box display="flex" alignItems="center">
      <Box mr={1}>
        {typeof icon === "string" ? (
          <IconButton color={color}>
            <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
          </IconButton>
        ) : (
          <IconButton color={color}>
            {icon}
          </IconButton>
        )}
      </Box>
      <Typography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {status}
      </Typography>
    </Box>
  );
}

StatusCell.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusCell;
