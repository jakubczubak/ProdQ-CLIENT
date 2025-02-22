import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';

export const NCProgramsList = ({ programs, droppableId, title }) => {
  return (
    <div className={styles.nc_programs_container}>
      <h2 className={styles.header}>{title}</h2>
      <Droppable droppableId={droppableId} direction='horizontal'>
        {(provided) => (
          <div
            className={styles.nc_programs}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '200px' }}
          >
            {programs.map((program, index) => (
              <NCProgram program={program} key={program.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
