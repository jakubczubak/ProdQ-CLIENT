import { MaterialGroupItem } from './MaterialGroupItem';

export const Result = ({ data, query }) => {
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
          .map((item) => <MaterialGroupItem key={item.id} item={item} />)
      )}
    </>
  );
};
