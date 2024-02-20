// Importy zewnętrzne
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

// Importy lokalne
import { DeleteModal } from '../common/DeleteModal';
import { calculationManager } from './service/calculationManager';
import { TableColumns } from './TableColumns';
import { DataTable } from './DataTable';

export const CalculationList = ({ calculationList }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    calculationManager.deleteCalculation(selectedItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const data = React.useMemo(
    () => calculationList,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calculationList, calculationList.length]
  );
  const columns = TableColumns({ calculationList, setOpenDeleteModal, setSelectedItem });

  return (
    <div>
      <DataTable columns={columns} data={data} />
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteItem}
        name={selectedItem.calculationName}
        text="calculation"
      />
    </div>
  );
};
