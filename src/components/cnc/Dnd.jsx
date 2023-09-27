import React, { useEffect } from 'react';
import { Column } from './Column';
import styles from './css/Dnd.module.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQuery } from '@tanstack/react-query';
import { cncManager } from './service/cncManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const Dnd = ({ filter }) => {
  const [state, setState] = React.useState({
    tasks: {},
    columns: {},
    columnOrder: []
  });

  const {
    data: tasks,
    isLoading: isLoading_tasks,
    isError: isError_tasks
  } = useQuery(['cnc', 'cnc_tasks'], cncManager.getTasks);
  const {
    data: columns,
    isLoading: isLoading_columns,
    isError: isError_columns
  } = useQuery(['cnc', 'cnc_columns'], cncManager.getColumns);
  const {
    data: columnOrder,
    isLoading: isLoading_column_order,
    isError: isError_column_order
  } = useQuery(['cnc', 'cnc_column_order'], cncManager.getColumnOrder);

  useEffect(() => {
    if (tasks && columns && columnOrder) {
      setState({
        tasks: tasks,
        columns: columns,
        columnOrder: columnOrder
      });
    }
  }, [tasks, columns, columnOrder]);

  if (isLoading_tasks || isLoading_columns || isLoading_column_order) {
    return <Loader />;
  }

  if (isError_tasks || isError_columns || isError_column_order) {
    return <Error message={[isError_column_order, isError_column_order, isError_column_order]} />;
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
      cncManager.updateColumns(newState.columns);
      cncManager.updateTasks(newState.tasks);

      return;
    }

    // Moving from one list to another

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    setState(newState);

    cncManager.updateColumns(newState.columns);
    cncManager.updateTasks(newState.tasks);
  };

  if (tasks && columns && columnOrder) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.columns_wrapper}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            if (filter === '') {
              const tasksList = column.taskIds.map((taskId) => state.tasks[taskId]);
              return (
                <Column key={column.id} title={column.title} tasks={tasksList} id={column.id} />
              );
            } else {
              const tasksList = column.taskIds.map((taskId) => state.tasks[taskId]);
              const filteredTasks = tasksList.filter(
                (task) =>
                  task.content.toLowerCase().includes(filter.toLowerCase()) ||
                  task.device_name.toLowerCase().includes(filter.toLowerCase())
              );
              return (
                <Column key={column.id} title={column.title} tasks={filteredTasks} id={column.id} />
              );
            }
          })}
        </div>
      </DragDropContext>
    );
  }
};
