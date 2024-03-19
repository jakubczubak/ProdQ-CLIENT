// Zewnętrzne importy
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

// Lokalne importy
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { ProductionTable } from './../production/ProductionTable';
import { ProductionModal } from './../production/ProductionModal';
import { productionManager } from './../production/service/productionManager';
import styles from './../production/css/Production.module.css';
import { IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { productionCartManager } from '../productionCart/service/productionCartManager';
import { useDispatch } from 'react-redux';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const ProjectListItemTable = ({projectID}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useQuery(
    ['production'],
    productionManager.getProductionItems
  );

  const dispatch = useDispatch();

  // Funkcja sortująca dane na podstawie właściwości 'createdOn'
  const sortByCreatedOn = (items) => {
    return items.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  };

  const handleExport = () => {
    data.forEach((item) => {
      productionCartManager.addItem(item, dispatch);
    });
  };

  const handleImport = () => {
    console.log('Import production list');
  };

  return (
    <>
      <div className={styles.icon_container}>
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
            }}
          />
        </Tooltip>
        <div>
          <Tooltip title="Import production list">
            <IconButton
              onClick={() => {
                handleImport();
              }}>
              <FileDownloadOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export production list">
            <IconButton
              onClick={() => {
                handleExport();
              }}>
              <FileUploadOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create production item"
          onClick={() => setOpen(true)}
        />
      </SpeedDial>

      {isLoading && <Loader />}
      {isError && (
        <Error message={'Failed to fetch production item list. Please try again later!'} />
      )}
      {data && (
        <ProductionTable
          items={sortByCreatedOn(data).filter((item) => {
            if (query === '') return item;
            else if (item.partName.toLowerCase().includes(query.toLowerCase())) return item;
          })}
        />
      )}
      {open && <ProductionModal projectID={projectID} onClose={() => setOpen(false)} />}
    </>
  );
};
