import React from 'react';
import { Breadcrumbs, Typography, SpeedDial, SpeedDialIcon, Tooltip } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import styles from './css/AccessorieGroupItemDetails.module.css';
import { accessorieManager } from '../accessories/service/AccessorieManager';
import { AccessoriesItemModal } from './AccessoriesItemModal';
import { AccessoriesList } from './AccessoriesList';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};

export const AccessorieGroupItemDetails = () => {
  const [openToolModal, setOpenToolModal] = useState(false);
  let { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['accessorie', id],
    queryFn: () => accessorieManager.getAccessorieGroupByID(id)
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Error while loading accessorie group" />;
  }

  return (
    <div>
      <Breadcrumbs
        className={styles.breadcrumbs}
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography color="text.primary">
          <Link to="/accessories" className={styles.link}>
            Accessories
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
          }}></SpeedDial>
      </Tooltip>
      <AccessoriesItemModal
        open={openToolModal}
        onClose={() => setOpenToolModal(false)}
        item={data}
      />
      {/* <AccessoriesList item={data} /> */}
    </div>
  );
};
