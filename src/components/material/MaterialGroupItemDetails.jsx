// Zewnętrzne importy
import { Breadcrumbs, Typography, SpeedDial, SpeedDialIcon, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

// Lokalne importy
import styles from './css/MaterialItemDetails.module.css';
import { materialManager } from './service/materialManager';
import { MaterialModal_ADD } from './MaterialModal_ADD';
import { MaterialList } from './MaterialList';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};

export const MaterialGroupItemDetails = () => {
  const isSelectMode = useSelector((state) => state.mode);

  const [openMaterialModal, setOpenMaterialModal] = useState(false);
  let { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['material', id],
    queryFn: () => materialManager.getMaterialGroupByID(id)
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={'Failed to fetch materials, please try again later.'} />;
  }

  return (
    <div>
      <Breadcrumbs
        className={styles.breadcrumbs}
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">
          {isSelectMode ? (
            <Link to="" className={styles.link}>
              ...
            </Link>
          ) : (
            <Link to="/dashboard" className={styles.link}>
              ...
            </Link>
          )}
        </Typography>
        <Typography color="text.primary">
          <Link to="/materials" className={styles.link}>
            Materials
          </Link>
        </Typography>
        <Typography color="text.primary"> {data.name}</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {data && data.name}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {data && data.materialType.name + ' ' + data.materialType.density + ' g/cm3'}
        </Typography>
      </div>
      {!isSelectMode && (
        <Tooltip title="Add material" placement="right">
          <SpeedDial
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            ariaLabel="Navigation speed dial"
            sx={speedDialStyles}
            onClick={() => {
              setOpenMaterialModal(true);
            }}
          ></SpeedDial>
        </Tooltip>
      )}
      <MaterialModal_ADD
        open={openMaterialModal}
        onClose={() => setOpenMaterialModal(false)}
        item={data}
      />
      <MaterialList item={data} />
    </div>
  );
};
