import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  SpeedDial,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import { SpeedDialIcon } from '@mui/material';
import styles from './css/productionQueue.module.css';
import { DragDropContext } from '@hello-pangea/dnd';
import { NCProgramsList } from './NCProgramsList';
import { CompletedProgramsList } from './CompletedProgramsList';
import { MachineCard } from './MachineCard'; // Zakładam, że masz już ten komponent

// Importowanie obrazów
import bacaImage from '../../assets/production/BACA R1000.png';
import venusImage from '../../assets/production/VENUS 350.png';

// Dane programów
const productionQueueData = {
  ncQueue: [
    {
      id: '1',
      name: '09_15_MRW14D_part_ready_now',
      quantity: '10szt.',
      time: '2h:51min',
      deadline: '01.03.2025r.',
      author: 'Jakub Czubak',
      type: 'mill',
      subtype: 'plate',
      date: ''
    },
    {
      id: '2',
      name: '14_01_DCB2D_mac1',
      quantity: '2szt.',
      time: '1h:30min',
      deadline: '02.03.2025r.',
      author: 'Anna Kowalska',
      type: 'turn',
      subtype: null,
      date: ''
    },
    {
      id: '3',
      name: '15_01_DCB2D_mac1',
      quantity: '4szt.',
      time: '3h:10min',
      deadline: '02.03.2025r.',
      author: 'Tomasz Zieliński',
      type: 'mill',
      subtype: 'part',
      date: ''
    },
    {
      id: '4',
      name: '2_MRW_14D_mac2',
      quantity: '8szt.',
      time: '1h:55min',
      deadline: '03.03.2025r.',
      author: 'Kamil Szymański',
      type: 'mill',
      subtype: 'modification',
      date: ''
    },
    {
      id: '5',
      name: '16_01_DCB2D_mac1',
      quantity: '5szt.',
      time: '2h:45min',
      deadline: '05.03.2025r.',
      author: 'Monika Wójcik',
      type: 'turn',
      subtype: null,
      date: ''
    },
    {
      id: '6',
      name: '17_01_DCB2D_mac2',
      quantity: '6szt.',
      time: '3h:25min',
      deadline: '06.03.2025r.',
      author: 'Piotr Kowalski',
      type: 'mill',
      subtype: 'plate',
      date: ''
    },
    {
      id: '7',
      name: '18_01_DCB2D_mac1',
      quantity: '3szt.',
      time: '2h:00min',
      deadline: '07.03.2025r.',
      author: 'Olga Nowak',
      type: 'turn',
      subtype: null,
      date: ''
    },
    {
      id: '8',
      name: '19_01_DCB2D_mac2',
      quantity: '7szt.',
      time: '4h:10min',
      deadline: '08.03.2025r.',
      author: 'Łukasz Cieślak',
      type: 'mill',
      subtype: 'part',
      date: ''
    },
    {
      id: '9',
      name: '20_01_DCB2D_mac1',
      quantity: '9szt.',
      time: '5h:30min',
      deadline: '09.03.2025r.',
      author: 'Adam Wojciechowski',
      type: 'mill',
      subtype: 'modification',
      date: ''
    },
    {
      id: '10',
      name: '21_01_DCB2D_mac2',
      quantity: '2szt.',
      time: '1h:20min',
      deadline: '10.03.2025r.',
      author: 'Karolina Dąbrowska',
      type: 'turn',
      subtype: null,
      date: ''
    },
    {
      id: '11',
      name: '22_01_DCB2D_mac1',
      quantity: '10szt.',
      time: '6h:00min',
      deadline: '11.03.2025r.',
      author: 'Marek Jabłoński',
      type: 'mill',
      subtype: 'plate',
      date: ''
    },
    {
      id: '12',
      name: '23_01_DCB2D_mac2',
      quantity: '3szt.',
      time: '2h:30min',
      deadline: '12.03.2025r.',
      author: 'Ewa Majewska',
      type: 'turn',
      subtype: null,
      date: ''
    },
    {
      id: '13',
      name: '24_01_DCB2D_mac1',
      quantity: '4szt.',
      time: '1h:45min',
      deadline: '13.03.2025r.',
      author: 'Wojciech Jankowski',
      type: 'mill',
      subtype: 'part',
      date: ''
    },
    {
      id: '14',
      name: '25_01_DCB2D_mac2',
      quantity: '6szt.',
      time: '3h:00min',
      deadline: '14.03.2025r.',
      author: 'Natalia Woźniak',
      type: 'mill',
      subtype: 'modification',
      date: ''
    },
    {
      id: '15',
      name: '26_01_DCB2D_mac1',
      quantity: '7szt.',
      time: '4h:50min',
      deadline: '15.03.2025r.',
      author: 'Krzysztof Lewandowski',
      type: 'turn',
      subtype: null,
      date: ''
    }
  ],
  baca1: [
    {
      id: '3',
      name: '03_01_DCB2D_mac1',
      quantity: '2szt.',
      time: '1h:30min',
      deadline: '02.03.2025r.',
      author: 'Damian Sobieraj',
      type: 'mill',
      subtype: 'plate',
      date: ''
    }
  ],
  baca2: [
    {
      id: '4',
      name: '04_01_DCB2D_mac2',
      quantity: '5szt.',
      time: '3h:15min',
      deadline: '03.03.2025r.',
      author: 'Paweł Nowak',
      type: 'turn',
      subtype: null,
      date: ''
    }
  ],
  vensu350: [
    {
      id: '5',
      name: '05_01_DCB2D_vensu',
      quantity: '8szt.',
      time: '4h:00min',
      deadline: '04.03.2025r.',
      author: 'Karolina Wiśniewska',
      type: 'mill',
      subtype: 'part',
      date: ''
    }
  ],
  completed: [
    {
      id: '6',
      name: '06_01_DCB2D_done',
      quantity: '3szt.',
      time: '2h:45min',
      deadline: '28.02.2025r.',
      author: 'Mateusz Krawczyk',
      type: 'turn',
      subtype: null,
      date: ''
    }
  ]
};


export const ProductionQueue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const speedDialStyles = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1000
  };

  const handleOnDragEnd = useCallback((result) => {

    console.log('Przeciągnięto i upuszczono:', result);
    // Logika przeciągania i upuszczania
  }, []);

  const handleGenerateQueue = useCallback((machineId) => {

    console.log('Generowanie kolejki dla maszyny:', machineId);
    // Logika generowania kolejki
  }, []);

  const handleSyncQueue = useCallback((machineId) => {

    console.log('Synchronizacja kolejki dla maszyny:', machineId);
    // Logika synchronizacji kolejki
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<Typography color="text.primary">/</Typography>}
        >
          <Typography color="text.primary">
            <Link to="/dashboard" className={styles.link}>
              ...
            </Link>
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
              )
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
