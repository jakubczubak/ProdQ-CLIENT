import styles from './MaterialItemDetails.module.css';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { materialManager } from './materialManager';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Table } from './Table';
import { Material } from './Material';
import { useState } from 'react';

export const MaterialItemDetails = () => {
  const [openMaterialModal, setOpenMaterialModal] = useState(true);
  let { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['materials', id],
    queryFn: () => materialManager.fetchMaterialByID(id)
  });

  return (
    <div>
      <Breadcrumbs
        className={styles.breadcrumbs}
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">
          <Link to="/" className={styles.link}>
            Materials
          </Link>
        </Typography>
        <Typography color="text.primary"> {data && data.materialGroupName}</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {data && data.materialGroupName}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {data && data.materialGroupCode}
        </Typography>
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create"
          onClick={() => {
            setOpenMaterialModal(true);
          }}
        />
      </SpeedDial>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && <Table data={data} />}
      <Material open={openMaterialModal} onClose={() => setOpenMaterialModal(false)} />
    </div>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};
