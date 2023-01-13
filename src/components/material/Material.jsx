import React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Breadcrumbs, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Material.module.css';
import { MaterialItem } from './MaterialItem';

const itemList = [
  {
    id: 1,
    name: 'Aluminium plate PA13',
    type: 'AW-5083',
    image: 'https://swiataluminium.com.pl/wp-content/uploads/2018/07/IMG_4419.jpg'
  },
  {
    id: 2,
    name: 'Aluminium plate PA4',
    type: 'AW-6082',
    image: 'https://metal-e.pl/userdata/public/gfx/4911/formatka-aluminiowa.jpg'
  },
  {
    id: 3,
    name: 'Ertacetal plate POM-C',
    type: 'Black',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxcBApWRvL_OkHPeQ4dpqLm0DTLKKAV-EtTA&usqp=CAU'
  }
];

export const Material = () => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Materials</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage Materials
        </Typography>
      </div>
      <div className={styles.material_container}>
        {itemList.map((item) => (
          <MaterialItem key={item.id} item={item} />
        ))}
      </div>
      <SpeedDial
        ariaLabel="Navigation speed dial"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" />
      </SpeedDial>
    </>
  );
};
