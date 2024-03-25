//Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import InfoIcon from '@mui/icons-material/Info';
//Importy lokalne
import styles from './css/Dashboard.module.css';
import { materialManager } from '../material/service/materialManager';
import { toolManager } from '../tool/service/toolManager';
import { orderManager } from '../order/service/orderManager';
import { projectListManager } from '../projects/service/projectListManager';

export const DashboardAlerts = () => {
  const [missingMaterialsQuantity, setMissingMaterialsQuantity] = useState(0);
  const [materialValueInMagazine, setMaterialValueInMagazine] = useState(0);
  const [missingToolsQuantity, setMissingToolsQuantity] = useState(0);
  const [toolValueInMagazine, setToolValueInMagazine] = useState(0);
  const [activeOrdersQuantity, setActiveOrdersQuantity] = useState(0);
  const [numberOfMaterialOnTheWay, setNumberOfMaterialOnTheWay] = useState(0);
  const [numberOfToolsOnTheWay, setNumberOfToolsOnTheWay] = useState(0);
  const [activeProjectsQuantity, setActiveProjectsQuantity] = useState(0);
  const [finishedProjectsQuantity, setFinishedProjectsQuantity] = useState(0);

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

    materialManager.getNumberOfMaterialsOnTheWay().then((response) => {
      setNumberOfMaterialOnTheWay(response);
    });

    toolManager.getNumberOfToolsOnTheWay().then((response) => {
      setNumberOfToolsOnTheWay(response);
    });

    projectListManager.getNumberOfActiveProjects().then((response) => {
      setActiveProjectsQuantity(response);
    });

    projectListManager.getNumberOfFinishedProjects().then((response) => {
      setFinishedProjectsQuantity(response);
    });
  }, []);
  return (
    <div className={styles.alert_cards_wrapper}>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <InfoIcon
            color="success"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{finishedProjectsQuantity}</p>
          <p className={styles.alert_text}>Finished projects</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <InfoIcon
            color="warning"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{activeProjectsQuantity}</p>
          <p className={styles.alert_text}>Active projects</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <ReportIcon
            color="error"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{missingMaterialsQuantity}</p>
          <p className={styles.alert_text}>Missing materials</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <ReportIcon
            color="error"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{missingToolsQuantity}</p>
          <p className={styles.alert_text}>Missing tools</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <InfoIcon
            color="info"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{numberOfMaterialOnTheWay}</p>
          <p className={styles.alert_text}>Materials on the way</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <InfoIcon
            color="info"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{numberOfToolsOnTheWay}</p>
          <p className={styles.alert_text}>Tools on the way</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <LocalShippingIcon
            color="warning"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>{activeOrdersQuantity}</p>
          <p className={styles.alert_text}>Active orders</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <SavingsOutlinedIcon
            color="success"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>
            {materialValueInMagazine} <span className={styles.alert_value_text}>PLN</span>
          </p>
          <p className={styles.alert_text}>Value of materials</p>
        </div>
      </div>
      <div className={styles.alert_card}>
        <div className={styles.icon_wrapper}>
          <SavingsOutlinedIcon
            color="success"
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div>
          <p className={styles.alert_value}>
            {toolValueInMagazine} <span className={styles.alert_value_text}>PLN</span>
          </p>
          <p className={styles.alert_text}>Value of tools</p>
        </div>
      </div>
    </div>
  );
};
