import { IconButton } from '@mui/material';
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
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


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

  const countWorkdays = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let deadlineIcon = <AllInclusiveOutlinedIcon fontSize="small" />;
  let deadlineText = 'No deadline';

  if (program.deadline) {
    const deadlineDate = new Date(program.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const workdaysLeft = countWorkdays(today, deadlineDate);

    let deadlineColor = 'inherit';
    if (workdaysLeft <= 4) {
      deadlineColor = 'error';
    } else if (workdaysLeft >= 5 && workdaysLeft <= 9) {
      deadlineColor = 'warning';
    }

    // Jeśli program jest zakończony, ustaw deadline na "completed" i zmień kolor ikony
    const calendarIconColor = program.isCompleted ? 'inherit' : deadlineColor;
    deadlineIcon = <CalendarMonthIcon fontSize="small" color={calendarIconColor} />;
    deadlineText = program.isCompleted
      ? `${program.deadline} (completed)`
      : `${program.deadline} (${workdaysLeft} working days)`;
  }

  const formatTime = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h:${formattedMinutes}m`;
  };

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
              { icon: <BookmarkBorderOutlinedIcon fontSize="small" />, text: program.orderName },
              {
                icon: <FunctionsOutlinedIcon fontSize="small" />,
                text: `${program.quantity} pcs.`
              },
              { icon: <AccessTimeIcon fontSize="small" />, text: formatTime(program.time) },
              { icon: deadlineIcon, text: deadlineText },
              { icon: <PersonOutlineOutlinedIcon fontSize="small" />, text: program.author }
            ].map((item, idx) => (
              <p key={idx} className={styles.nc_program_text}>
                {item.icon} {item.text}
              </p>
            ))}
          </div>
          <div className={styles.nc_programs_item_btn}>
            {program.subtype && subtypeColors[program.subtype] && (
              <IconButton size="small">
                <FiberManualRecordOutlinedIcon
                  color={subtypeColors[program.subtype]}
                  size="small"
                />
              </IconButton>
            )}
            <IconButton onClick={handleDelete} aria-label="delete" size="small">
              <DeleteOutlinedIcon color="action" />
            </IconButton>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};
