import React, { useState, useEffect } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CircularProgress from '@mui/material/CircularProgress'; // Import spinnera
import styles from './css/Dashboard.module.css';
import { materialManager } from '../material/service/materialManager';
import { toolManager } from '../tool/service/toolManager';
import { orderManager } from '../order/service/orderManager';
import { projectListManager } from '../projects/service/projectListManager';
import { recycleManager } from '../recycling/service/recycleManager';
import { accessorieItemManager } from '../accessorieItem/service/AccessorieItemManager';
import { AlertCard } from './AlertCard';

export const DashboardAlerts = () => {
  const [data, setData] = useState({
    missingMaterialsQuantity: null,
    materialValueInMagazine: null,
    missingToolsQuantity: null,
    toolValueInMagazine: null,
    activeOrdersQuantity: null,
    numberOfMaterialOnTheWay: null,
    numberOfToolsOnTheWay: null,
    activeProjectsQuantity: null,
    finishedProjectsQuantity: null,
    recycledMaterialsQuantity: null,
    recyclingRefund: null,
    missingAccessoriesQuantity: null,
    accessoriesValueInMagazine: null
  });

  const [loadingData, setLoadingData] = useState({
    missingMaterialsQuantity: true,
    materialValueInMagazine: true,
    missingToolsQuantity: true,
    toolValueInMagazine: true,
    activeOrdersQuantity: true,
    numberOfMaterialOnTheWay: true,
    numberOfToolsOnTheWay: true,
    activeProjectsQuantity: true,
    finishedProjectsQuantity: true,
    recycledMaterialsQuantity: true,
    recyclingRefund: true,
    missingAccessoriesQuantity: true,
    accessoriesValueInMagazine: true
  });

  // Cache key for session storage
  const cacheKey = 'dashboardData';

  useEffect(() => {
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      // Use cached data if available
      const parsedData = JSON.parse(cachedData);
      setData(parsedData);
      setLoadingData({
        missingMaterialsQuantity: false,
        materialValueInMagazine: false,
        missingToolsQuantity: false,
        toolValueInMagazine: false,
        activeOrdersQuantity: false,
        numberOfMaterialOnTheWay: false,
        numberOfToolsOnTheWay: false,
        activeProjectsQuantity: false,
        finishedProjectsQuantity: false,
        recycledMaterialsQuantity: false,
        recyclingRefund: false,
        missingAccessoriesQuantity: false,
        accessoriesValueInMagazine: false
      });
    } else {
      // Fetch data if no cache available
      const fetchData = async () => {
        const responses = await Promise.all([
          materialManager.getNumberOfMissingMaterials(),
          materialManager.getValueOfMaterialsInMagazine(),
          toolManager.getNumberOfMissingTools(),
          toolManager.getValueOfToolsInMagazine(),
          orderManager.getNumberOfActiveOrders(),
          materialManager.getNumberOfMaterialsOnTheWay(),
          toolManager.getNumberOfToolsOnTheWay(),
          projectListManager.getNumberOfActiveProjects(),
          projectListManager.getNumberOfFinishedProjects(),
          recycleManager.getRecycledMaterialsQuantity(),
          recycleManager.getRecyclingRefund(),
          accessorieItemManager.getNumberOfMissingAccessories(),
          accessorieItemManager.getValueOfAccessoriesInMagazine()
        ]);

        const newData = {
          missingMaterialsQuantity: responses[0],
          materialValueInMagazine: responses[1],
          missingToolsQuantity: responses[2],
          toolValueInMagazine: responses[3],
          activeOrdersQuantity: responses[4],
          numberOfMaterialOnTheWay: responses[5],
          numberOfToolsOnTheWay: responses[6],
          activeProjectsQuantity: responses[7],
          finishedProjectsQuantity: responses[8],
          recycledMaterialsQuantity: responses[9],
          recyclingRefund: responses[10],
          missingAccessoriesQuantity: responses[11],
          accessoriesValueInMagazine: responses[12]
        };

        // Save data to state and cache
        setData(newData);
        sessionStorage.setItem(cacheKey, JSON.stringify(newData));

        // Set loadingData to false after fetching
        setLoadingData({
          missingMaterialsQuantity: false,
          materialValueInMagazine: false,
          missingToolsQuantity: false,
          toolValueInMagazine: false,
          activeOrdersQuantity: false,
          numberOfMaterialOnTheWay: false,
          numberOfToolsOnTheWay: false,
          activeProjectsQuantity: false,
          finishedProjectsQuantity: false,
          recycledMaterialsQuantity: false,
          recyclingRefund: false,
          missingAccessoriesQuantity: false,
          accessoriesValueInMagazine: false
        });
      };

      fetchData();
    }

    // Clear cache on page refresh
    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem(cacheKey);
    });
  }, []);

  const alertData = [
    {
      icon: <InfoOutlinedIcon />,
      color: 'success',
      value: loadingData.finishedProjectsQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.finishedProjectsQuantity}`
      ),
      value_text: '',
      label: 'Finished projects'
    },
    {
      icon: <InfoOutlinedIcon />,
      color: 'warning',
      value: loadingData.activeProjectsQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.activeProjectsQuantity}`
      ),
      value_text: '',
      label: 'Active projects'
    },
    {
      icon: <WarningAmberOutlinedIcon />,
      color: 'error',
      value: loadingData.missingMaterialsQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.missingMaterialsQuantity}`
      ),
      value_text: '',
      label: 'Missing materials'
    },
    {
      icon: <WarningAmberOutlinedIcon />,
      color: 'error',
      value: loadingData.missingToolsQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.missingToolsQuantity}`
      ),
      value_text: '',
      label: 'Missing tools'
    },
    {
      icon: <WarningAmberOutlinedIcon />,
      color: 'error',
      value: loadingData.missingAccessoriesQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.missingAccessoriesQuantity}`
      ),
      value_text: '',
      label: 'Missing accessories'
    },
    {
      icon: <LocalShippingOutlinedIcon />,
      color: 'info',
      value: loadingData.numberOfMaterialOnTheWay ? (
        <CircularProgress size={20} />
      ) : (
        `${data.numberOfMaterialOnTheWay}`
      ),
      value_text: '',
      label: 'Materials in transit'
    },
    {
      icon: <LocalShippingOutlinedIcon />,
      color: 'info',
      value: loadingData.numberOfToolsOnTheWay ? (
        <CircularProgress size={20} />
      ) : (
        `${data.numberOfToolsOnTheWay}`
      ),
      value_text: '',
      label: 'Tools in transit'
    },
    {
      icon: <InfoOutlinedIcon />,
      color: 'warning',
      value: loadingData.activeOrdersQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.activeOrdersQuantity}`
      ),
      value_text: '',
      label: 'Active orders'
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon />,
      color: 'success',
      value: loadingData.materialValueInMagazine ? (
        <CircularProgress size={20} />
      ) : (
        `${data.materialValueInMagazine}`
      ),
      value_text: 'PLN',
      label: 'Material value'
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon />,
      color: 'success',
      value: loadingData.toolValueInMagazine ? (
        <CircularProgress size={20} />
      ) : (
        `${data.toolValueInMagazine}`
      ),
      value_text: 'PLN',
      label: 'Tool value'
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon />,
      color: 'success',
      value: loadingData.accessoriesValueInMagazine ? (
        <CircularProgress size={20} />
      ) : (
        `${data.accessoriesValueInMagazine}`
      ),
      value_text: 'PLN',
      label: 'Accessory value'
    },
    {
      icon: <ScaleOutlinedIcon />,
      color: 'success',
      value: loadingData.recycledMaterialsQuantity ? (
        <CircularProgress size={20} />
      ) : (
        `${data.recycledMaterialsQuantity}`
      ),
      value_text: 'kg',
      label: 'Materials recycled'
    },
    {
      icon: <RecyclingOutlinedIcon />,
      color: 'success',
      value: loadingData.recyclingRefund ? (
        <CircularProgress size={20} />
      ) : (
        `${data.recyclingRefund}`
      ),
      value_text: 'PLN',
      label: 'Recycling refund'
    }
  ];

  return (
    <div className={styles.alert_cards_wrapper}>
      {alertData.map((alert, index) => (
        <AlertCard key={index} {...alert} />
      ))}
    </div>
  );
};
