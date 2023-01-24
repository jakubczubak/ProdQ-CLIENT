import { MaterialItem } from './MaterialItem';
import { useState } from 'react';
import { Notifications } from '../Notifications';

export const Result = ({ data, query }) => {
  const [onSuccessDelete, setOnSuccessDelete] = useState(false);
  const [onErrorDelete, setOnErrorDelete] = useState(false);

  return (
    <>
      {!data.length ? (
        <div>There is no data!</div>
      ) : (
        data
          .filter((item) => {
            if (query === '') {
              return item;
            } else if (
              item.materialGroupName.toLowerCase().includes(query.toLowerCase()) ||
              item.materialGroupCode.toLowerCase().includes(query.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => (
            <MaterialItem
              key={item.id}
              item={item}
              onSuccessDelete={() => {
                setOnSuccessDelete(true);
              }}
              onErrorDelete={() => {
                setOnErrorDelete(true);
              }}
            />
          ))
      )}
      <Notifications
        open={onErrorDelete}
        onClose={() => setOnErrorDelete(false)}
        severity="error"
        message="Failed to delete material, please try again later."
      />
      <Notifications
        open={onSuccessDelete}
        onClose={() => setOnSuccessDelete(false)}
        severity="info"
        message="Successfully delete material."
      />
    </>
  );
};
