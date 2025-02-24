import { Tooltip, IconButton } from '@mui/material';
import {
  FunctionsOutlined as FunctionsOutlinedIcon,
  AccessTime as AccessTimeIcon,
  InfoOutlined as InfoOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon
} from '@mui/icons-material';
import { Draggable } from '@hello-pangea/dnd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import { motion } from 'framer-motion';
import styles from './css/productionQueue.module.css';

export const NCProgram = ({ program, index }) => {
  const handleDelete = () => {
    console.log('Delete program:', program.id);
  };

  const backgroundClasses = {
    mill: styles.backgroundMill,
    turn: styles.backgroundTurn
  };

  const itemClassName = `${styles.nc_programs_item} ${backgroundClasses[program.type] || ''}`;

  const subtypeColors = {
    plate: 'primary',
    part: 'secondary',
    modification: 'success',
    turn: 'error'
  };

  // Analiza deadline
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zerowanie czasu dla dokładnego porównania
  const deadlineDate = new Date(program.deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const timeDiff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  let deadlineColor = 'inherit';
  if (timeDiff <= 4) {
    deadlineColor = 'error';
  } else if (timeDiff >= 5 && timeDiff <= 9) {
    deadlineColor = 'warning';
  }

  return (
    <Draggable draggableId={program.id} index={index}>
      {(provided) => (
        <motion.div
          className={itemClassName}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <div className={styles.nc_programs_item_info}>
            {[
              { icon: <PushPinOutlinedIcon fontSize="small" />, text: program.name },
              { icon: <FunctionsOutlinedIcon fontSize="small" />, text: program.quantity },
              { icon: <AccessTimeIcon fontSize="small" />, text: program.time },
              {
                icon: <CalendarMonthIcon fontSize="small" color={deadlineColor} />,
                text: program.deadline
              },
              { icon: <InfoOutlinedIcon fontSize="small" />, text: program.author }
            ].map((item, idx) => (
              <p key={idx} className={styles.nc_program_text}>
                {item.icon} {item.text}
              </p>
            ))}
          </div>
          <div className={styles.nc_programs_item_btn}>
            {program.subtype && subtypeColors[program.subtype] && (
              <Tooltip title={program.subtype.charAt(0).toUpperCase() + program.subtype.slice(1)}>
                <IconButton size="small">
                  <FiberManualRecordOutlinedIcon
                    color={subtypeColors[program.subtype]}
                    size="small"
                  />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} aria-label="delete" size="small">
                <DeleteOutlinedIcon color="action" />
              </IconButton>
            </Tooltip>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};
