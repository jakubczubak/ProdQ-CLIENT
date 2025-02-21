import { Button, Tooltip, IconButton } from '@mui/material'; // Dodano IconButton
import {
  SubtitlesOutlined as SubtitlesOutlinedIcon,
  FunctionsOutlined as FunctionsOutlinedIcon,
  AccessTime as AccessTimeIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon
} from '@mui/icons-material';
import styles from './css/productionQueue.module.css';
import { Draggable } from 'react-beautiful-dnd';

export const NCProgram = ({ program, index }) => {
  const buttonStyles = {
    fontSize: '16px',
    color: 'gray',
    textTransform: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none', // Dodano, aby usunąć cień
    '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' } // Upewnij się, że tło jest przezroczyste
  };

  const handleDelete = () => {
    console.log('Delete program:', program.id); // Dodaj logikę usuwania
  };

  return (
    <Draggable draggableId={program.id} index={index}>
      {(provided) => (
        <div
          className={styles.nc_programs_item}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} aria-label="delete" size="small">
                {' '}
                {/* Dodano IconButton */}
                <DeleteOutlinedIcon color="action" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
    </Draggable>
  );
};
