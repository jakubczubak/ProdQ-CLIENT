//Importy zewnętrze
import Lottie from 'lottie-react';
//Importy lokalne
import { ToolGroupItem } from './ToolGroupItem';
import animation from '../../assets/Lottie/no-data.json';
import styles from './css/Result.module.css';

export const Result = ({ data, query }) => {
  const sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      {!sortedData.length ? (
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      ) : (
        sortedData
          .filter((item) => {
            if (query === '') {
              return item;
            } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
              return item;
            }
          })
          .map((item) => <ToolGroupItem key={item.id} tool={item} />)
      )}
    </>
  );
};
