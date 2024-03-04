// Importy zewnętrzne
import React from 'react';
import 'dayjs/locale/pl';

// Importy lokalne
import styles from './css/RecycleItem.module.css';
import { WasteItem } from './WasteItem';

export const WasteList = ({ recyclingItems, setRecyclingItems }) => {
  return (
    <>
      {recyclingItems.length > 0 && <p className={styles.waste_list}>WASTE LIST</p>}
      <div className={styles.waste_list_wrapper}>
        {recyclingItems.map((item, index) => (
          <WasteItem
            index={index}
            key={index}
            item={item}
            recyclingItems={recyclingItems}
            setRecyclingItems={setRecyclingItems}
          />
        ))}
      </div>
    </>
  );
};
