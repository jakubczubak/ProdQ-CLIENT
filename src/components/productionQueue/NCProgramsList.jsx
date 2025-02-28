import React, { useMemo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';

export const NCProgramsList = ({ programs, droppableId, title }) => {
  const calculateProgramsPerRow = () => {
    const programWidth = 300; // 290px (szerokość NCProgram) + 10px (marginesy)
    const containerPadding = 40; // 20px padding z każdej strony .nc_programs
    const availableWidth = window.innerWidth - containerPadding;
    return Math.max(1, Math.floor(availableWidth / programWidth));
  };

  const programGroups = useMemo(() => {
    const programsPerRow = calculateProgramsPerRow();
    const groups = [];
    for (let i = 0; i < programs.length; i += programsPerRow) {
      groups.push(programs.slice(i, i + programsPerRow));
    }
    return groups;
  }, [programs]);

  return (
    <div className={styles.nc_programs_container}>
      <h2 className={styles.production_header}>{title}</h2>
      <div className={styles.nc_programs_wrapper}>
        {programGroups.map((group, groupIndex) => (
          <Droppable
            key={`${droppableId}-${groupIndex}`}
            droppableId={`${droppableId}-${groupIndex}`}
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                className={styles.nc_programs_row}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: '190px' }}
              >
                {group.length === 0 && !snapshot.isDragging && !snapshot.isDraggingOver && (
                  <div className={styles.placeholder}>Drop program here!</div>
                )}
                {group.map((program, index) => (
                  <NCProgram
                    program={program}
                    key={`${droppableId}-${groupIndex}-${program.id}`}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};