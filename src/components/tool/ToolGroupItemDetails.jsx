import styles from './css/ToolGroupItemDetails.module.css';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { toolManager } from './service/toolManager';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ToolModal_ADD } from './ToolModal_ADD';
import { useState } from 'react';
import { ToolList } from './ToolList';
import Lottie from 'lottie-react';
import error from '../../assets/Lottie/error.json';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const ToolGroupItemDetails = () => {
  const [openToolModal, setOpenToolModal] = useState(false);
  let { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tool', id],
    queryFn: () => toolManager.getToolGroupByID(id)
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Error while loading tool group" />;
  }

  return (
    <div>
      <Breadcrumbs
        className={styles.breadcrumbs}
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">
          <Link to="/tools" className={styles.link}>
            Tools
          </Link>
        </Typography>
        <Typography color="text.primary"> {data.name}</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {data && data.name}
        </Typography>
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create"
          onClick={() => {
            setOpenToolModal(true);
          }}
        />
      </SpeedDial>
      <ToolModal_ADD open={openToolModal} onClose={() => setOpenToolModal(false)} item={data} />
      <ToolList item={data} />
    </div>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};
