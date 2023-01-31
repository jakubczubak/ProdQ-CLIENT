import styles from './css/MaterialItemDetails.module.css';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { materialManager } from './service/materialManager';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Material } from './MaterialModal_ADD';
import { useState } from 'react';
import { MaterialList } from './MaterialList';

export const MaterialGroupItemDetails = () => {
  const [openMaterialModal, setOpenMaterialModal] = useState(false);
  let { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['material', id],
    queryFn: () => materialManager.fetchMaterialListByMaterialGroupID(id)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <Breadcrumbs
        className={styles.breadcrumbs}
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">
          <Link to="/" className={styles.link}>
            Materials
          </Link>
        </Typography>
        <Typography color="text.primary"> {data.materialGroupName}</Typography>
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
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create"
          onClick={() => {
            setOpenMaterialModal(true);
          }}
        />
      </SpeedDial>
      <Material
        open={openMaterialModal}
        onClose={() => setOpenMaterialModal(false)}
        item={data}
      />
      <MaterialList id={id} materialList={data.materialList} />
    </div>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};
