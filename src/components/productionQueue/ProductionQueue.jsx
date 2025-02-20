import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SpeedDial,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { SpeedDialIcon } from '@mui/material';
import styles from './css/productionQueue.module.css';
import { NCProgram } from './NCProgram';
import { Machine } from './Machine';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Importowanie obrazów
import bacaImage from '../../assets/production/BACA R1000.png';
import venusImage from '../../assets/production/VENUS 350.png';

// Dane programów
const initialData = [
  {
    id: '1',
    name: '1_MRW_14D_mac1',
    quantity: '10szt.',
    time: '2h:51min',
    deadline: '01.03.2025r.',
    author: 'Jakub Czubak',
  },
  {
    id: '2',
    name: '14_01_DCB2D_mac1',
    quantity: '2szt.',
    time: '1h:30min',
    deadline: '02.03.2025r.',
    author: 'Anna Kowalska',
  },
  {
    id: '3',
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
    id: 'BACA_1',
    machineName: 'BACA 1',
    imageSrc: bacaImage,
    altText: 'BACA R1000',
    totalTime: '1h:30min',
    programs: initialData, // Przypisanie listy programów do maszyny
  },
  {
    id: 'BACA_2',
    machineName: 'BACA 2',
    imageSrc: bacaImage,
    altText: 'BACA R1000',
    totalTime: '15h:30min',
    programs: initialData, // Przypisanie listy programów do maszyny
  },
  {
    id: 'VENUS_350',
    machineName: 'VENUS 350',
    imageSrc: venusImage,
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

  const handleOnDragEnd = (result) => {

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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="column_1">
              {(provided) => (
                <div
                  className={styles.nc_programs}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: '200px' }} // Ustal minimalną wysokość
                >
                  {initialData.map((program, index) => (
                    <NCProgram program={program} key={program.id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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