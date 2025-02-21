import React, { useState, useCallback } from 'react';
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
import { DragDropContext } from 'react-beautiful-dnd';
import { NCProgramsList } from './NCProgramsList';
import { CompletedProgramsList } from './CompletedProgramsList';
import { MachineCard } from './MachineCard' // Zakładam, że masz już ten komponent

// Importowanie obrazów
import bacaImage from '../../assets/production/BACA R1000.png';
import venusImage from '../../assets/production/VENUS 350.png';

// Dane programów
const productionQueueData = {
  ncQueue: [
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
    }
  ], // Lista NC programów w kolejce
  baca1: [
    {
      id: '3',
      name: '03_01_DCB2D_mac1',
      quantity: '2szt.',
      time: '1h:30min',
      deadline: '02.03.2025r.',
      author: 'Damian Sobieraj',
    }
  ],   // Lista programów przypisana do maszyny BACA 1
  baca2: [
    {
      id: '4',
      name: '04_01_DCB2D_mac2',
      quantity: '5szt.',
      time: '3h:15min',
      deadline: '03.03.2025r.',
      author: 'Paweł Nowak',
    }
  ],   // Lista programów przypisana do maszyny BACA 2
  vensu350: [
    {
      id: '5',
      name: '05_01_DCB2D_vensu',
      quantity: '8szt.',
      time: '4h:00min',
      deadline: '04.03.2025r.',
      author: 'Karolina Wiśniewska',
    }
  ], // Lista programów przypisana do Vensu 350
  completed: [
    {
      id: '6',
      name: '06_01_DCB2D_done',
      quantity: '3szt.',
      time: '2h:45min',
      deadline: '28.02.2025r.',
      author: 'Mateusz Krawczyk',
    }
  ] // Lista programów zakończonych
};



export const ProductionQueue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');



  const speedDialStyles = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1000,
  };

  const handleOnDragEnd = useCallback((result) => {
    // Logika przeciągania i upuszczania
  }, []);

  const handleGenerateQueue = useCallback((machineId) => {
    // Logika generowania kolejki
  }, []);

  const handleSyncQueue = useCallback((machineId) => {
    // Logika synchronizacji kolejki
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
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
          {/* Lista programów NC */}
          <NCProgramsList
            programs={productionQueueData.ncQueue}
            droppableId="nc_programs"
            title="NC Programs"
          />

          {/* Kolejka produkcyjna */}
          <div className={styles.production_queue_container}>
            <h2 className={styles.header}>Production queue</h2>
            <div className={styles.machines_container}>
              <MachineCard
                image={bacaImage}
                name="BACA 1"
                time="2h:35min"
                programs={productionQueueData.baca1}
                droppableId="BACA_1"
                onGenerateQueue={() => handleGenerateQueue('baca1')}
                onSyncQueue={() => handleSyncQueue('baca1')}
              />
              <MachineCard
                image={bacaImage}
                name="BACA 2"
                time="2h:35min"
                programs={productionQueueData.baca2}
                droppableId="BACA_2"
                onGenerateQueue={() => handleGenerateQueue('baca2')}
                onSyncQueue={() => handleSyncQueue('baca2')}
              />
              <MachineCard
                image={venusImage}
                name="VENUS 350"
                time="2h:10min"
                programs={productionQueueData.vensu350}
                droppableId="VENUS_350"
                onGenerateQueue={() => handleGenerateQueue('vensu350')}
                onSyncQueue={() => handleSyncQueue('vensu350')}
              />
            </div>
          </div>

          {/* Lista zakończonych programów */}
          <CompletedProgramsList
            programs={productionQueueData.completed}
            droppableId="completed_nc_programs"
            title="Completed Programs"
          />
        </div>

        <Tooltip title="Add new NC Program" placement="left">
          <SpeedDial
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            ariaLabel="Add new NC program"
            sx={speedDialStyles}
            onClick={() => setIsOpen(true)}
          />
        </Tooltip>
      </DragDropContext>
    </>
  );
};