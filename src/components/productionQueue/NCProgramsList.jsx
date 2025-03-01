import React from 'react';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';

export const NCProgramsList = ({ programs, title }) => {
  return (
    <div className={styles.nc_programs_container}>
      <h2 className={styles.production_header}>{title}</h2>
      <div className={styles.nc_programs_row} style={{ minHeight: '190px' }}>
        {programs.length === 0 && (
          <div className={styles.placeholder}>No programs here yet!</div>
        )}
        {programs.map((program, index) => (
          <NCProgram
            program={program}
            key={`${title}-${program.id}`}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};