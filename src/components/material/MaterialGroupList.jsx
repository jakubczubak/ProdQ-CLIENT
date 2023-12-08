import {
  SpeedDial,
  SpeedDialAction,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip
} from '@mui/material';
import styles from './css/MaterialGroupList.module.css';
import { useQuery } from '@tanstack/react-query';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { MaterialGroupModal_ADD } from './MaterialGroupModal_ADD';
import { materialManager } from './service/materialManager';
import { Result } from './Result';
import { MaterialTypeModal } from '../materialType/MaterialTypeModal';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import EditIcon from '@mui/icons-material/Edit';
import { SpeedDialIcon } from '@mui/material';

export const MaterialGroupList = ({ open }) => {
  const [query, setQuery] = useState(''); // query for search
  const [isOpen, setIsOpen] = useState(open); // open the modal for material group
  const [isOpenMaterialTypeModal, setIsOpenMaterialTypeModal] = useState(false); // open the modal for material type
  const { data, isLoading, isError } = useQuery(['material'], materialManager.getMaterialGroups); // fetch all materials

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Materials</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage materials
        </Typography>
      </div>
      <Tooltip title="Search" placement="right">
        <TextField
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          InputProps={{
            className: styles.search_input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}></TextField>
      </Tooltip>
      <div className={styles.material_container}>
        {isLoading && <Loader />}
        {isError && <Error message={'Failed to fetch materials, please try again later.'} />}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<img src={require('../../assets/icons/add.png')} alt="Create material type" />}
          tooltipTitle="Create material group"
          onClick={() => setIsOpen(true)}
        />
        <SpeedDialAction
          icon={
            <img
              src={require('../../assets/sidebar_icon/cogwheel.png')}
              alt="Create material group"
            />
          }
          tooltipTitle="Create material type"
          onClick={() => setIsOpenMaterialTypeModal(true)}
        />
      </SpeedDial>
      <MaterialGroupModal_ADD open={isOpen} onClose={() => setIsOpen(false)} />
      <MaterialTypeModal
        open={isOpenMaterialTypeModal}
        onClose={() => setIsOpenMaterialTypeModal(false)}
      />
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
