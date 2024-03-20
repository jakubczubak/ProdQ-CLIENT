// Zewnętrzne importy
import React, { useState } from 'react';
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Lokalne importy

import { ProductionTable } from './../production/ProductionTable';

import styles from './../production/css/Production.module.css';
import { IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { productionCartManager } from '../productionCart/service/productionCartManager';
import { useDispatch } from 'react-redux';
import { InfoModal } from '../common/InfoModal';
import { showNotification } from '../common/service/showNotification';
import { projectListManager } from './service/projectListManager';
import { useQueryClient } from '@tanstack/react-query';

export const ProjectListItemTable = ({ productionItems, projectID }) => {
  const [query, setQuery] = useState('');
  const [openExportInfoModal, setOpenExportInfoModal] = useState(false);
  const [openImportInfoModal, setOpenImportInfoModal] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Funkcja sortująca dane na podstawie właściwości 'createdOn'
  const sortByCreatedOn = (items) => {
    return items.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  };

  const handleExport = () => {
    productionItems.forEach((item) => {
      productionCartManager.addItem(item, dispatch);
    });
    setOpenExportInfoModal(false);
  };

  async function importProductionItems() {
    const productionItems = productionCartManager.getItems();
    try {
      await Promise.all(
        productionItems.map(async (item) => {
          await projectListManager.addProductionItemToProject(projectID, item.item, dispatch);
        })
      );
      queryClient.invalidateQueries('projectItem');
      showNotification('Production items imported successfully', 'success', dispatch);
      productionCartManager.clearAll(dispatch);
      setOpenImportInfoModal(false);
    } catch (error) {
      showNotification('Failed to import production items', 'error', dispatch);
      setOpenImportInfoModal(false);
    }
  }

  const checkIfProductionCartIsEmpty = () => {
    if (productionCartManager.getItems().length === 0) {
      showNotification('Production cart is empty', 'warning', dispatch);
      return true;
    }
    return false;
  };

  const checkIfProjectHasProductionItems = () => {
    if (productionItems.length === 0) {
      showNotification('There are no production items in this project', 'warning', dispatch);
      return true;
    }
    return false;
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
                if (checkIfProductionCartIsEmpty()) return;
                setOpenImportInfoModal(true);
              }}>
              <FileDownloadOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export production list">
            <IconButton
              onClick={() => {
                if (checkIfProjectHasProductionItems()) return;
                setOpenExportInfoModal(true);
              }}>
              <FileUploadOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {productionItems && (
        <ProductionTable
          items={sortByCreatedOn(productionItems).filter((item) => {
            if (query === '') return item;
            else if (item.partName.toLowerCase().includes(query.toLowerCase())) return item;
          })}
        />
      )}
      <InfoModal
        open={openExportInfoModal}
        onConfirm={handleExport}
        onCancel={() => {
          setOpenExportInfoModal(false);
        }}
        text={
          'Do you want to add all items to the production cart? Before you do this, make sure that the production cart is empty. If not, the items will be added to the cart and the existing items could be duplicated.'
        }
      />
      <InfoModal
        open={openImportInfoModal}
        onConfirm={importProductionItems}
        onCancel={() => {
          setOpenImportInfoModal(false);
        }}
        text={'Do you want to add all production items from cart to this project?'}
      />
    </>
  );
};
