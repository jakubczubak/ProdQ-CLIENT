import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';
import classNames from 'classnames'; // Użyjemy tej biblioteki do łączenia klas

export const NCProgramsList = ({ programs, title }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'nc-programs-list'
  });

  const programIds = programs.map((program) => program.id);

  return (
    <div className={styles.nc_programs_container}>
      <h2 className={styles.production_header}> {title} </h2>
      <div
        ref={setNodeRef}
        className={classNames(styles.nc_programs_row, {
          [styles.nc_programs_row_active]: isOver
        })}
        >
        <SortableContext items={programIds} strategy={rectSortingStrategy}>
          {programs.length === 0 && <div className={styles.placeholder}>No programs here yet!</div>}
          {programs.map((program, index) => (
            <NCProgram program={program} key={program.id} index={index} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
