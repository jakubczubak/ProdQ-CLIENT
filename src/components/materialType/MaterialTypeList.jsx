//Importy zewnętrzne
import React from 'react';
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
//Importy lokalne
import styles from './css/MaterialTypeList.module.css';
import { MaterialTypeModal } from './MaterialTypeModal';
import { materialTypeManager } from './service/materialTypeManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { Table } from './Table';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const MaterialTypeList = () => {
  const [query, setQuery] = useState('');
  const [isOpenMaterialTypeModal, setIsOpenMaterialTypeModal] = useState(false); // open the modal for material type
  const { data, isLoading, isError } = useQuery(
    ['material_types'],
    materialTypeManager.getMaterialTypes
  ); // fetch all materials types

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to fetch material types. Check console for more info." />;
  }

  if (data) {
    return (
      <>
        <Tooltip PopperProps={{ disablePortal: true }} title="Search" placement="right">
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
        <Table
          items={data
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((item) => {
              if (query === '') {
                return item;
              } else if (
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.density.toString().toLowerCase().includes(query.toLowerCase())
              ) {
                return item;
              }
            })}
        />
        <Tooltip PopperProps={{ disablePortal: true }} title="Add material type" placement="right">
          <SpeedDial
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            ariaLabel="Navigation speed dial"
            sx={speedDialStyles}
            onClick={() => setIsOpenMaterialTypeModal(true)}></SpeedDial>
        </Tooltip>
        <MaterialTypeModal
          open={isOpenMaterialTypeModal}
          onClose={() => setIsOpenMaterialTypeModal(false)}
        />
      </>
    );
  }
};
