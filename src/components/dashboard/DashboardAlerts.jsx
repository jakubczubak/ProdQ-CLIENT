//Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalculateIcon from '@mui/icons-material/Calculate';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import InfoIcon from '@mui/icons-material/Info';
//Importy lokalne
import styles from './css/Dashboard.module.css';
import { materialManager } from '../material/service/materialManager';
import { toolManager } from '../tool/service/toolManager';
import { orderManager } from '../order/service/orderManager';
import { calculationManager } from '../calculation/service/calculationManager';

export const DashboardAlerts = () => {
  const [missingMaterialsQuantity, setMissingMaterialsQuantity] = useState(0);
  const [materialValueInMagazine, setMaterialValueInMagazine] = useState(0);
  const [missingToolsQuantity, setMissingToolsQuantity] = useState(0);
  const [toolValueInMagazine, setToolValueInMagazine] = useState(0);
  const [activeOrdersQuantity, setActiveOrdersQuantity] = useState(0);
  const [activeCalculationsQuantity, setActiveCalculationsQuantity] = useState(0);
  const [numberOfMaterialOnTheWay, setNumberOfMaterialOnTheWay] = useState(0);
  const [numberOfToolsOnTheWay, setNumberOfToolsOnTheWay] = useState(0);

  useEffect(() => {
    materialManager.getNumberOfMissingMaterials().then((response) => {
      setMissingMaterialsQuantity(response);
    });

    materialManager.getValueOfMaterialsInMagazine().then((response) => {
      setMaterialValueInMagazine(response);
    });

    toolManager.getNumberOfMissingTools().then((response) => {
      setMissingToolsQuantity(response);
    });

    toolManager.getValueOfToolsInMagazine().then((response) => {
      setToolValueInMagazine(response);
    });

    orderManager.getNumberOfActiveOrders().then((response) => {
      setActiveOrdersQuantity(response);
    });

    calculationManager.getNumberOfActiveCalculations().then((response) => {
      setActiveCalculationsQuantity(response);
    });

    materialManager.getNumberOfMaterialsOnTheWay().then((response) => {
      setNumberOfMaterialOnTheWay(response);
    });

    toolManager.getNumberOfToolsOnTheWay().then((response) => {
      setNumberOfToolsOnTheWay(response);
    });
  }, []);
  return (
    <div className={styles.cards}>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <ReportIcon
            color="error"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Missing materials:</p>
          <p className={styles.alert_value}>{missingMaterialsQuantity}</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <ReportIcon
            color="error"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Missing tools:</p>
          <p className={styles.alert_value}>{missingToolsQuantity}</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <InfoIcon
            color="info"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Materials on the way:</p>
          <p className={styles.alert_value}>{numberOfMaterialOnTheWay}</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <InfoIcon
            color="info"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Tools on the way:</p>
          <p className={styles.alert_value}>{numberOfToolsOnTheWay}</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <LocalShippingIcon
            color="warning"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Active orders:</p>
          <p className={styles.alert_value}>{activeOrdersQuantity}</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <CalculateIcon
            color="warning"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Active calculations</p>
          <p className={styles.alert_value}>{activeCalculationsQuantity}</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <SavingsOutlinedIcon
            color="action"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Value of materials</p>
          <p className={styles.alert_value}>
            {materialValueInMagazine} <span className={styles.alert_value_text}>PLN</span>
          </p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <SavingsOutlinedIcon
            color="action"
            sx={{
              width: '20px',
              height: '20px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_text}>Value of tools</p>
          <p className={styles.alert_value}>
            {toolValueInMagazine} <span className={styles.alert_value_text}>PLN</span>
          </p>
        </div>
      </div>
    </div>
  );
};
