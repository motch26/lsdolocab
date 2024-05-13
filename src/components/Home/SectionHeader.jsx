import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SectionBackButton = ({ Icon, title }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = () => {
    navigate("..");
  };
  return (
    <Button
      title="Back to Home"
      aria-label="Back to Home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleBack}
    >
      {isHovered ? <ArrowBack sx={{ mr: 3 }} /> : <Icon sx={{ mr: 3 }} />}
      <Typography variant="body1" sx={{ textTransform: "initial" }}>
        {title}
      </Typography>
    </Button>
  );
};

export default SectionBackButton;
