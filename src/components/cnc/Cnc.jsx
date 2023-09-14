import React from 'react';
import styles from './css/Cnc.module.css';
import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Tooltip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { useState } from 'react';
import cncImage from '../../assets/BACAR1000.png';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
export const Cnc = () => {
  const [setIsOpen] = useState(false); // open the modal

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Cnc jobs</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage cnc jobs
        </Typography>
      </div>
      <div className={styles.cnc_jobs_wrapper}>
        <div className={styles.cnc_active_jobs}>
          <p className={styles.section_header}>
            Queue
            <HourglassEmptyOutlinedIcon
              color="primary"
              sx={{ paddingLeft: '10px', height: '17px' }}
            />
          </p>
          <div className={styles.item_list}>
            <div className={`${styles.item} ${styles.plate}`}>
              <p className={styles.item_name}>1_PA13_415_575_10</p>
              <p className={styles.item_quantity}>
                <span>2</span>
                <span>x</span>
              </p>
              <div className={styles.btn_wrapper}>
                <Tooltip title="Edit">
                  <EditOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={`${styles.item} ${styles.part_from_plate}`}>
              <p className={styles.item_name}>01_03_SLIDAR_mac1</p>
              <p className={styles.item_quantity}>
                <span>2</span>
                <span>x</span>
              </p>
              <div className={styles.btn_wrapper}>
                <Tooltip title="Edit">
                  <EditOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={`${styles.item} ${styles.part}`}>
              <p className={styles.item_name}>01_03_SLIDAR_mac1</p>
              <p className={styles.item_quantity}>
                <span>2</span>
                <span>x</span>
              </p>
              <div className={styles.btn_wrapper}>
                <Tooltip title="Edit">
                  <EditOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={`${styles.item} ${styles.modification}`}>
              <p className={styles.item_name}>02_02_LS DAL_mac1</p>
              <p className={styles.item_quantity}>
                <span>2</span>
                <span>x</span>
              </p>
              <div className={styles.btn_wrapper}>
                <Tooltip title="Edit">
                  <EditOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cnc_in_progess_jobs}>
          <div className={styles.baca_I}>
            <img src={cncImage} alt="Baca r1000" className={styles.img} />
            <p className={styles.section_header}>
              BACA I
              <AutorenewOutlinedIcon color="warning" sx={{ paddingLeft: '10px', height: '17px' }} />
            </p>
            <div className={styles.item_list_baca}></div>
            <Button
              color="primary"
              variant="text"
              sx={{
                position: 'absolute',
                bottom: '1px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fafafa'
              }}>
              Generate
            </Button>
          </div>

          <div className={styles.baca_II}>
            <img src={cncImage} alt="Baca r1000" className={styles.img} />
            <p className={styles.section_header}>
              BACA II
              <AutorenewOutlinedIcon color="warning" sx={{ paddingLeft: '10px', height: '17px' }} />
            </p>
            <div className={styles.item_list_baca}></div>

            <Button
              color="primary"
              variant="text"
              sx={{
                position: 'absolute',
                bottom: '1px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fafafa'
              }}>
              Generate
            </Button>
          </div>
        </div>
        <div className={styles.cnc_completed_jobs}>
          <p className={styles.section_header}>
            Completed
            <CheckOutlinedIcon sx={{ paddingLeft: '10px', height: '17px' }} color="success" />
          </p>
          <div className={styles.item_list}></div>
        </div>
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" onClick={() => setIsOpen(true)} />
      </SpeedDial>
    </>
  );
};
const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
