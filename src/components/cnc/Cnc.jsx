import React from 'react';
import styles from './css/Cnc.module.css';
import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { useState } from 'react';
import cncImage from '../../assets/BACAR1000.png';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

export const Cnc = () => {
  const [setIsOpen] = useState(false); // open the modal

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
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
            Active jobs{' '}
            <HourglassEmptyOutlinedIcon
              color="primary"
              sx={{ paddingLeft: '10px', height: '17px' }}
            />
          </p>
          <div className={styles.item_list}>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
          </div>
        </div>
        <div className={styles.cnc_in_progess_jobs}>
          <div className={styles.baca_I}>
            <img src={cncImage} alt="Baca r1000" className={styles.img} />
            <p className={styles.section_header}>
              BACA I
              <AutorenewOutlinedIcon color="warning" sx={{ paddingLeft: '10px', height: '17px' }} />
            </p>
            <div className={styles.item_list_baca}>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
            </div>
            <Button
              color="primary"
              variant="text"
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fafafa'
              }}
            >
              Generate
            </Button>
          </div>

          <div className={styles.baca_II}>
            <img src={cncImage} alt="Baca r1000" className={styles.img} />
            <p className={styles.section_header}>
              BACA II
              <AutorenewOutlinedIcon color="warning" sx={{ paddingLeft: '10px', height: '17px' }} />
            </p>
            <div className={styles.item_list_baca}>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
              <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
              <div className={styles.item}>Lorem ipsum </div>
            </div>

            <Button
              color="primary"
              variant="text"
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fafafa'
              }}
            >
              Generate
            </Button>
          </div>
        </div>
        <div className={styles.cnc_completed_jobs}>
          <p className={styles.section_header}>
            Completed jobs{' '}
            <CheckOutlinedIcon sx={{ paddingLeft: '10px', height: '17px' }} color="success" />
          </p>
          <div className={styles.item_list}>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
            <div className={styles.item}>Lorem ipsum dolor sit amet consectetur</div>
            <div className={styles.item}>Lorem ipsum </div>
          </div>
        </div>
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}
      >
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
