import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SpeedDial,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
  Button,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  SubtitlesOutlined as SubtitlesOutlinedIcon,
  FunctionsOutlined as FunctionsOutlinedIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  DownloadOutlined as DownloadOutlinedIcon,
  SyncOutlined as SyncOutlinedIcon,
} from '@mui/icons-material';
import { SpeedDialIcon } from '@mui/material';
import styles from './css/productionQueue.module.css';

// Dane programów
const initialData = [
  {

    name: '1_MRW_14D_mac1',
    quantity: '10szt.',
    time: '2h:51min',
    deadline: '01.03.2025r.',
    author: 'Jakub Czubak',
  },
  {
    id: 2,
    name: '14_01_DCB2D_mac1',
    quantity: '2szt.',
    time: '1h:30min',
    deadline: '02.03.2025r.',
    author: 'Anna Kowalska',
  },
  {
    id: 3,
    name: '03_01_DCB2D_mac1',
    quantity: '2szt.',
    time: '1h:30min',
    deadline: '02.03.2025r.',
    author: 'Damian Sobieraj',
  },
];

// Dane maszyn
const initialMachines = [
  {
    machineName: 'BACA 1',
    imageSrc: require('../../assets/production/BACA R1000.png'),
    altText: 'BACA R1000',
    totalTime: '1h:30min',
    programs: initialData, // Przypisanie listy programów do maszyny
  },
  {
    machineName: 'BACA 2',
    imageSrc: require('../../assets/production/BACA R1000.png'),
    altText: 'BACA R1000',
    totalTime: '15h:30min',
    programs: initialData, // Przypisanie listy programów do maszyny
  },
  {
    machineName: 'VENUS 350',
    imageSrc: require('../../assets/production/VENUS 350.png'),
    altText: 'VENUS 350',
    totalTime: '10h:30min',
    programs: initialData, // Przypisanie listy programów do maszyny
  },
];

export const ProductionQueue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const speedDialStyles = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1000,
  };

  const buttonStyles = {
    fontSize: '16px',
    color: 'gray',
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'transparent' },
  };



  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>...</Link>
        </Typography>
        <Typography color="text.primary">Production</Typography>
      </Breadcrumbs>

      <div className={styles.header}>
        <Typography variant="h5">Production Manager</Typography>
      </div>

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
            ),
          }}
        />
      </Tooltip>
      <div className={styles.production_container}>
        <div className={styles.nc_programs_container}>
          <h2 className={styles.header}>NC Programs</h2>
          <div className={styles.nc_programs}>
            {initialData.map((program, index) => (
              <div className={styles.nc_programs_item} key={index}>
                <div className={styles.nc_programs_item_info}>
                  <Button
                    variant="text"
                    startIcon={<SubtitlesOutlinedIcon />}
                    size="small"
                    disableRipple
                    sx={buttonStyles}
                  >
                    {program.name}
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<FunctionsOutlinedIcon />}
                    size="small"
                    disableRipple
                    sx={buttonStyles}
                  >
                    {program.quantity}
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<AccessTimeIcon />}
                    size="small"
                    disableRipple
                    sx={buttonStyles}
                  >
                    {program.time}
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<ReportProblemOutlinedIcon />}
                    size="small"
                    disableRipple
                    sx={buttonStyles}
                  >
                    {program.deadline}
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<InfoOutlinedIcon />}
                    size="small"
                    disableRipple
                    sx={buttonStyles}
                  >
                    {program.author}
                  </Button>
                </div>
                <div className={styles.nc_programs_item_btn}>
                  <Tooltip title='Delete'>
                    <DeleteOutlinedIcon color="action" />
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.production_queue_container}>
          <h2 className={styles.header}>Production queue</h2>
          <div className={styles.machine_queue}>
            {initialMachines.map(({ machineName, imageSrc, altText, totalTime, programs }, index) => (
              <div className={styles.machine_card} key={index}>
                <img className={styles.machine_img} src={imageSrc} alt={altText} />
                <h3 className={styles.machine_name}>{machineName}</h3>
                <Button
                  variant="text"
                  startIcon={<AccessTimeIcon />}
                  size="small"
                  disableRipple
                  sx={buttonStyles}
                >
                  {totalTime}
                </Button>
                <div className={styles.machine_programs}>
                  {programs.map((program, idx) => (
                    <div className={styles.nc_programs_item} key={idx}>
                      <div className={styles.nc_programs_item_info}>
                        <Button
                          variant="text"
                          startIcon={<SubtitlesOutlinedIcon />}
                          size="small"
                          disableRipple
                          sx={buttonStyles}
                        >
                          {program.name}
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<FunctionsOutlinedIcon />}
                          size="small"
                          disableRipple
                          sx={buttonStyles}
                        >
                          {program.quantity}
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<AccessTimeIcon />}
                          size="small"
                          disableRipple
                          sx={buttonStyles}
                        >
                          {program.time}
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<ReportProblemOutlinedIcon />}
                          size="small"
                          disableRipple
                          sx={buttonStyles}
                        >
                          {program.deadline}
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<InfoOutlinedIcon />}
                          size="small"
                          disableRipple
                          sx={buttonStyles}
                        >
                          {program.author}
                        </Button>
                      </div>
                      <div className={styles.nc_programs_item_btn}>
                        <Tooltip title='Delete'>
                          <DeleteOutlinedIcon color="action" />
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.machine_btn}>
                  <Tooltip title='Generate queue'>
                    <IconButton aria-label="download">
                      <DownloadOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Sync queue'>
                    <IconButton aria-label="sync">
                      <SyncOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tooltip title="Add new NC Program" placement="left">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Add new NC program"
          sx={speedDialStyles}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
    </>
  );
};