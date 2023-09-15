import React from 'react';
import { Column } from './Column';
import initialData from './service/initial-data';
import styles from './css/DndExample.module.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';

export const DndExample = () => {
  const [state, setState] = useState(initialData); // [state, setState

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    };

    setState(newState);

    //todo
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columns_wrapper}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} title={column.title} tasks={tasks} id={column.id} />;
        })}
      </div>
    </DragDropContext>
  );
};
