import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';

export const CompletedProgramsList = ({ programs, title }) => {
  const { setNodeRef } = useDroppable({
    id: 'completed-programs-list'
  });

  const programIds = programs.map((program) => program.id);

  return (
    <div className={styles.nc_programs_container}>
      <h2 className={styles.production_header}> {title} </h2>
      <div ref={setNodeRef} className={styles.nc_programs_row} style={{ minHeight: '190px' }}>
        <SortableContext items={programIds} strategy={rectSortingStrategy}>
          {programs.length === 0 && (
            <div className={styles.placeHolder}>No programs here yet! </div>
          )}
          {programs.map((program, index) => (
            <NCProgram program={program} key={program.id} index={index} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
