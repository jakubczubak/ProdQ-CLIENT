//Importy zewnętrzne
import { Breadcrumbs, Typography, SpeedDial, SpeedDialIcon, Tooltip } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
//Importy lokalne
import styles from './css/ToolGroupItemDetails.module.css';
import { toolManager } from './service/toolManager';
import { ToolModal_ADD } from './ToolModal_ADD';
import { ToolList } from './ToolList';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};

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
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
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
      <Tooltip title="Add tool" placement="right">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={speedDialStyles}
          onClick={() => {
            setOpenToolModal(true);
          }}
        ></SpeedDial>
      </Tooltip>
      <ToolModal_ADD open={openToolModal} onClose={() => setOpenToolModal(false)} item={data} />
      <ToolList item={data} />
    </div>
  );
};
