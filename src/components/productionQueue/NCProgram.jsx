import { Tooltip, IconButton } from '@mui/material';
import {
  SubtitlesOutlined as SubtitlesOutlinedIcon,
  FunctionsOutlined as FunctionsOutlinedIcon,
  AccessTime as AccessTimeIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon
} from '@mui/icons-material';
import styles from './css/productionQueue.module.css';
import { Draggable } from '@hello-pangea/dnd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

export const NCProgram = ({ program, index }) => {
  const handleDelete = () => {
    console.log('Delete program:', program.id); // Dodaj logikę usuwania
  };

  // Przypisanie klasy tła w zależności od typu
  const backgroundClass =
    program.type === 'mill'
      ? styles.backgroundMill
      : program.type === 'turn'
      ? styles.backgroundTurn
      : '';

  const itemClassName = `${styles.nc_programs_item} ${backgroundClass}`;

  return (
    <Draggable draggableId={program.id} index={index}>
      {(provided) => (
        <div
          className={itemClassName}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.nc_programs_item_info}>
            <p className={styles.nc_program_text}>
              <PushPinOutlinedIcon fontSize="small" /> {program.name}
            </p>
            <p className={styles.nc_program_text}>
              <FunctionsOutlinedIcon fontSize="small" /> {program.quantity}
            </p>
            <p className={styles.nc_program_text}>
              <AccessTimeIcon fontSize="small" /> {program.time}
            </p>
            <p className={styles.nc_program_text}>
              <CalendarMonthIcon fontSize="small" /> {program.deadline}
            </p>
            <p className={styles.nc_program_text}>
              <InfoOutlinedIcon fontSize="small" /> {program.author}
            </p>
          </div>
          <div className={styles.nc_programs_item_btn}>
          <Tooltip title="Plate">
              <IconButton  size="small">
                <FiberManualRecordOutlinedIcon color="primary" size="small"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} aria-label="delete" size="small">
                <DeleteOutlinedIcon color="action" />
              </IconButton>
            </Tooltip>
          
          </div>

        </div>
      )}
    </Draggable>
  );
};
