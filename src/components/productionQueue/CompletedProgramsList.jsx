import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';

export const CompletedProgramsList = ({ programs, droppableId, title }) => {
  return (
    <div className={styles.nc_programs_container}>
      <h2 className={styles.production_header}>{title}</h2>
      <Droppable droppableId={droppableId} direction="horizontal">
        {(provided, snapshot) => (
          <div
            className={styles.nc_programs}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '240px' }}>
            {programs.length === 0 && !snapshot.isDragging && !snapshot.isDraggingOver && (
              <div className={styles.placeholder}>Drop program here!</div>
            )}
            {programs.map((program, index) => (
              <NCProgram program={program} key={program.id} index={index} />
            ))}
            {provided.placeholder} {/* Standardowy placeholder dla DnD */}
          </div>
        )}
      </Droppable>
    </div>
  );
};
