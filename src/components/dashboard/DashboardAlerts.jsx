//Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
//Importy lokalne
import styles from './css/Dashboard.module.css';
import { materialManager } from '../material/service/materialManager';
import { toolManager } from '../tool/service/toolManager';
import { orderManager } from '../order/service/orderManager';
import { projectListManager } from '../projects/service/projectListManager';
import { recycleManager } from '../recycling/service/recycleManager';
import { AlertCard } from './AlertCard';

export const DashboardAlerts = () => {
  const [data, setData] = useState({
    missingMaterialsQuantity: 0,
    materialValueInMagazine: 0,
    missingToolsQuantity: 0,
    toolValueInMagazine: 0,
    activeOrdersQuantity: 0,
    numberOfMaterialOnTheWay: 0,
    numberOfToolsOnTheWay: 0,
    activeProjectsQuantity: 0,
    finishedProjectsQuantity: 0,
    recycledMaterialsQuantity: 0,
    recyclingRefund: 0
  });

  useEffect(() => {
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
        recycleManager.getRecyclingRefund()
      ]);

      setData({
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
        recyclingRefund: responses[10]
      });
    };

    fetchData();
  }, []);

  const alertData = [
    {
      icon: <InfoOutlinedIcon />,
      color: 'success',
      value: data.finishedProjectsQuantity,
      value_text: '',
      label: 'Finished projects'
    },
    {
      icon: <InfoOutlinedIcon />,
      color: 'warning',
      value: data.activeProjectsQuantity,
      value_text: '',
      label: 'Active projects'
    },
    {
      icon: <WarningAmberOutlinedIcon />,
      color: 'error',
      value: data.missingMaterialsQuantity,
      value_text: '',
      label: 'Missing materials'
    },
    {
      icon: <WarningAmberOutlinedIcon />,
      color: 'error',
      value: data.missingToolsQuantity,
      value_text: '',
      label: 'Missing tools'
    },
    {
      icon: <LocalShippingOutlinedIcon />,
      color: 'info',
      value: data.numberOfMaterialOnTheWay,
      value_text: '',
      label: 'Materials in transit'
    },
    {
      icon: <LocalShippingOutlinedIcon />,
      color: 'info',
      value: data.numberOfToolsOnTheWay,
      value_text: '',
      label: 'Tools in transit'
    },
    {
      icon: <InfoOutlinedIcon />,
      color: 'warning',
      value: data.activeOrdersQuantity,
      value_text: '',
      label: 'Active orders'
    },
    {
      icon: <SavingsOutlinedIcon />,
      color: 'success',
      value: `${data.materialValueInMagazine}`,
      value_text: 'PLN',
      label: 'Material value'
    },
    {
      icon: <SavingsOutlinedIcon />,
      color: 'success',
      value: `${data.toolValueInMagazine}`,
      value_text: 'PLN',
      label: 'Tool value'
    },
    {
      icon: <ScaleOutlinedIcon />,
      color: 'success',
      value: `${data.recycledMaterialsQuantity}`,
      value_text: 'kg',
      label: 'Materials recycled'
    },
    {
      icon: <RecyclingOutlinedIcon />,
      color: 'success',
      value: `${data.recyclingRefund}`,
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
