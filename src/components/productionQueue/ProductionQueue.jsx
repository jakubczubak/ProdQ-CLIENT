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
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { NCProgramsList } from './NCProgramsList';
import { CompletedProgramsList } from './CompletedProgramsList';
import { MachineCard } from './MachineCard'; // Zakładam, że masz już ten komponent

// Importowanie obrazów
import bacaImage from '../../assets/production/BACA R1000.png';
import venusImage from '../../assets/production/VENUS 350.png';

// Dane programów
const initialProductionQueueData = {
  ncQueue: [
    {
      id: '1',
      name: '09_15_MRW14D_part_ready_now',
      quantity: '10szt.',
      time: '2h:51min',
      deadline: '2025-02-25',
      author: 'Jakub Czubak',
      type: 'mill',
      subtype: 'plate',
      date: '',
      order: 1
    },
    {
      id: '2',
      name: '14_01_DCB2D_mac1',
      quantity: '2szt.',
      time: '1h:30min',
      deadline: '2025-03-02',
      author: 'Anna Kowalska',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 2
    },
    {
      id: '3',
      name: '15_01_DCB2D_mac1',
      quantity: '4szt.',
      time: '3h:10min',
      deadline: '2025-03-02',
      author: 'Tomasz Zieliński',
      type: 'mill',
      subtype: 'part',
      date: '',
      order: 3
    },
    {
      id: '4',
      name: '2_MRW_14D_mac2',
      quantity: '8szt.',
      time: '1h:55min',
      deadline: '2025-03-03',
      author: 'Kamil Szymański',
      type: 'mill',
      subtype: 'modification',
      date: '',
      order: 4
    },
    {
      id: '5',
      name: '16_01_DCB2D_mac1',
      quantity: '5szt.',
      time: '2h:45min',
      deadline: '2025-03-05',
      author: 'Monika Wójcik',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 5
    },
    {
      id: '6',
      name: '17_01_DCB2D_mac2',
      quantity: '6szt.',
      time: '3h:25min',
      deadline: '2025-03-06',
      author: 'Piotr Kowalski',
      type: 'mill',
      subtype: 'plate',
      date: '',
      order: 6
    },
    {
      id: '7',
      name: '18_01_DCB2D_mac1',
      quantity: '3szt.',
      time: '2h:00min',
      deadline: '2025-03-07',
      author: 'Olga Nowak',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 7
    },
    {
      id: '8',
      name: '19_01_DCB2D_mac2',
      quantity: '7szt.',
      time: '4h:10min',
      deadline: '2025-03-08',
      author: 'Łukasz Cieślak',
      type: 'mill',
      subtype: 'part',
      date: '',
      order: 8
    },
    {
      id: '9',
      name: '20_01_DCB2D_mac1',
      quantity: '9szt.',
      time: '5h:30min',
      deadline: '2025-03-09',
      author: 'Adam Wojciechowski',
      type: 'mill',
      subtype: 'modification',
      date: '',
      order: 9
    },
    {
      id: '10',
      name: '21_01_DCB2D_mac2',
      quantity: '2szt.',
      time: '1h:20min',
      deadline: '2025-03-10',
      author: 'Karolina Dąbrowska',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 10
    },
    {
      id: '11',
      name: '22_01_DCB2D_mac1',
      quantity: '10szt.',
      time: '6h:00min',
      deadline: '2025-03-11',
      author: 'Marek Jabłoński',
      type: 'mill',
      subtype: 'plate',
      date: '',
      order: 11
    },
    {
      id: '12',
      name: '23_01_DCB2D_mac2',
      quantity: '3szt.',
      time: '2h:30min',
      deadline: '2025-03-12',
      author: 'Ewa Majewska',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 12
    },
    {
      id: '13',
      name: '24_01_DCB2D_mac1',
      quantity: '4szt.',
      time: '1h:45min',
      deadline: '2025-03-13',
      author: 'Wojciech Jankowski',
      type: 'mill',
      subtype: 'part',
      date: '',
      order: 13
    },
    {
      id: '14',
      name: '25_01_DCB2D_mac2',
      quantity: '6szt.',
      time: '3h:00min',
      deadline: '2025-03-14',
      author: 'Natalia Woźniak',
      type: 'mill',
      subtype: 'modification',
      date: '',
      order: 14
    },
    {
      id: '15',
      name: '26_01_DCB2D_mac1',
      quantity: '7szt.',
      time: '4h:50min',
      deadline: '2025-03-15',
      author: 'Krzysztof Lewandowski',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 15
    }
  ],
  baca1: [
    {
      id: '16',
      name: '03_01_DCB2D_mac1',
      quantity: '2szt.',
      time: '1h:30min',
      deadline: '2025-03-02',
      author: 'Damian Sobieraj',
      type: 'mill',
      subtype: 'plate',
      date: '',
      order: 16
    }
  ],
  baca2: [
    {
      id: '17',
      name: '04_01_DCB2D_mac2',
      quantity: '5szt.',
      time: '3h:15min',
      deadline: '2025-03-03',
      author: 'Paweł Nowak',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 17
    }
  ],
  vensu350: [
    {
      id: '18',
      name: '05_01_DCB2D_vensu',
      quantity: '8szt.',
      time: '4h:00min',
      deadline: '2025-03-04',
      author: 'Karolina Wiśniewska',
      type: 'mill',
      subtype: 'part',
      date: '',
      order: 18
    }
  ],
  completed: [
    {
      id: '19',
      name: '06_01_DCB2D_done',
      quantity: '3szt.',
      time: '2h:45min',
      deadline: '2025-02-28',
      author: 'Mateusz Krawczyk',
      type: 'turn',
      subtype: 'turn',
      date: '',
      order: 19
    }
  ]
};

export const ProductionQueue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [productionQueueData, setProductionQueueData] = useState(initialProductionQueueData);

  const speedDialStyles = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1000
  };

  const handleOnDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;

      // Jeśli element został upuszczony poza obszar droppable
      if (!destination) {
        return;
      }

      // Jeśli element został upuszczony w tym samym miejscu
      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
      }

      // Kopiujemy dane, aby nie modyfikować bezpośrednio stanu
      const newProductionQueueData = { ...productionQueueData };

      // Pobieramy element z źródła
      const sourceList = newProductionQueueData[source.droppableId];
      const [removed] = sourceList.splice(source.index, 1);

      // Dodajemy element do docelowej listy
      const destinationList = newProductionQueueData[destination.droppableId];
      destinationList.splice(destination.index, 0, removed);

      // Aktualizujemy stan
      setProductionQueueData(newProductionQueueData);

      console.log('Przeciągnięto i upuszczono:', result);
    },
    [productionQueueData]
  );

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
          separator={<Typography color="text.primary">/</Typography>}>
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
            droppableId="ncQueue"
            title="NC Programs"
          />

          {/* Kolejka produkcyjna */}
          <div className={styles.production_queue_container}>
            <h2 className={styles.production_header}>Production queue</h2>
            <div className={styles.machines_container}>
              <MachineCard
                image={bacaImage}
                name="BACA 1"
                time="2h:35min"
                programs={productionQueueData.baca1}
                droppableId="baca1"
                onGenerateQueue={() => handleGenerateQueue('baca1')}
                onSyncQueue={() => handleSyncQueue('baca1')}
              />
              <MachineCard
                image={bacaImage}
                name="BACA 2"
                time="2h:35min"
                programs={productionQueueData.baca2}
                droppableId="baca2"
                onGenerateQueue={() => handleGenerateQueue('baca2')}
                onSyncQueue={() => handleSyncQueue('baca2')}
              />
              <MachineCard
                image={venusImage}
                name="VENUS 350"
                time="2h:10min"
                programs={productionQueueData.vensu350}
                droppableId="vensu350"
                onGenerateQueue={() => handleGenerateQueue('vensu350')}
                onSyncQueue={() => handleSyncQueue('vensu350')}
              />
            </div>
          </div>

          {/* Lista zakończonych programów */}
          <CompletedProgramsList
            programs={productionQueueData.completed}
            droppableId="completed"
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
