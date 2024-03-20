// Importy zewnętrzne:
import React from 'react';
// Importy lokalne:
import styles from '../projects/css/ProjectListItem.module.css';
import { ChartContainer } from './ChartContainer';

export const ProjectInfo = ({
  productionValue,
  materialValue,
  toolValue,
  productionTime,
  projectName,
  hourlyRate,
  handleChangeProjectHourlyRate,
  productionValueBasedOnDepartmentCost,
  totalProductionValue
}) => {
  return (
    <div className={styles.project_info_wrapper}>
      <div className={styles.project_main_info}>
        <div className={styles.container}>
          <img
            className={styles.project_img}
            src={require('./../../assets/icons/graph.png')}
            alt="graph"
          />
          <p className={styles.project_title}>{projectName}</p>
          <p className={styles.project_text}>Project name</p>
        </div>
        <div className={styles.container}>
          <img
            className={styles.project_img}
            src={require('./../../assets/icons/clock.png')}
            alt="clock"
          />
          <p className={styles.project_title}>
            {productionTime} <span>h</span>
          </p>
          <p className={styles.project_text}>Production time</p>
        </div>
        <div className={styles.container}>
          <img
            className={styles.project_img}
            src={require('./../../assets/icons/coins.png')}
            alt="coins"
          />
          <p className={styles.project_title}>
            {materialValue} <span>PLN</span>
          </p>
          <p className={styles.project_text}>Material value</p>
        </div>
        <div className={styles.container}>
          <img
            className={styles.project_img}
            src={require('./../../assets/icons/coins.png')}
            alt="coins"
          />
          <p className={styles.project_title}>
            {toolValue} <span>PLN</span>
          </p>
          <p className={styles.project_text}>Tool value</p>
        </div>
      </div>
      <div className={styles.project_value_wrapper}>
        <ChartContainer
          handleChangeProjectHourlyRate={handleChangeProjectHourlyRate}
          hourlyRate={hourlyRate}
          materialValue={materialValue}
          productionValue={productionValue}
          productionValueBasedOnDepartmentCost={productionValueBasedOnDepartmentCost}
          toolValue={toolValue}
          totalProductionValue={totalProductionValue}
        />
      </div>
    </div>
  );
};
