import React from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export const SpeedDialSection = () => {
  const navigate = useNavigate();
  const speedDialStyles = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1
  };

  return (
    <SpeedDial
      icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      ariaLabel="Navigation speed dial"
      sx={speedDialStyles}>
      <SpeedDialAction
        icon={<AddIcon />}
        tooltipTitle="Create calculation"
        onClick={() => navigate('/calculation/new')}
      />
    </SpeedDial>
  );
};
