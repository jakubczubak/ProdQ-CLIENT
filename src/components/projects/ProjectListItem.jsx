import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import { Breadcrumbs, Typography } from '@mui/material';
import styles from '../projects/css/ProjectListItem.module.css';

export const ProjectListItem = () => {
  const { id } = useParams();

  const department_maintenance_cost = [
    ['Cost name', 'PLN'],
    ['Production value', 1],
    ['Material value', 1],
    ['Tool value', 1]
  ];

  console.log(id);
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Link color="inherit" to="/projects" className={styles.link}>
          <Typography color="text.primary">Project list</Typography>
        </Link>
        <Typography color="text.primary">Project name</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Project details
        </Typography>
      </div>
      <div className={styles.project_info_wrapper}>
        <div className={styles.project_main_info}>
          <div className={styles.container}>
            <img
              className={styles.project_img}
              src={require('./../../assets/icons/graph.png')}
              alt=""
            />
            <p className={styles.project_title}>MS250</p>
            <p className={styles.project_text}>Project name</p>
          </div>
          <div className={styles.container}>
            <img
              className={styles.project_img}
              src={require('./../../assets/icons/clock.png')}
              alt=""
            />
            <p className={styles.project_title}>
              56 <span>h</span>
            </p>
            <p className={styles.project_text}>Production time</p>
          </div>
          <div className={styles.container}>
            <img
              className={styles.project_img}
              src={require('./../../assets/icons/coins.png')}
              alt=""
            />
            <p className={styles.project_title}>
              32 000 <span>PLN</span>
            </p>
            <p className={styles.project_text}>Material value</p>
          </div>
          <div className={styles.container}>
            <img
              className={styles.project_img}
              src={require('./../../assets/icons/coins.png')}
              alt=""
            />
            <p className={styles.project_title}>
              1500 <span>PLN</span>
            </p>
            <p className={styles.project_text}>Tool value</p>
          </div>
        </div>
        <div className={styles.project_value_wrapper}>
          <div className={styles.chart_container}>
            <div className={styles.project_value}>
              <div className={styles.project_value_rate}>
                <p className={styles.project_value_number}>
                  200 <span>PLN/h</span>
                </p>
                <p className={styles.project_value_title}>Hourly rate</p>
              </div>
              <div className={styles.project_value_rate}>
                <p className={styles.project_value_number}>
                  34 500 <span>PLN</span>
                </p>
                <p className={styles.project_value_title}>Production value</p>
              </div>
              <div className={styles.project_value_rate}>
                <p className={styles.project_value_number}>
                  34 500 <span>PLN</span>
                </p>
                <p className={styles.project_value_title}>
                  Production value based on department cost
                </p>
              </div>
            </div>
            <div className={styles.chart_wrapper}>
              <Chart
                chartType="PieChart"
                data={department_maintenance_cost}
                height={'600px'}
                width={'600px'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
