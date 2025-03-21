//Importy zewnętrzne
import Lottie from 'lottie-react';
//Importy lokalne
import { MaterialGroupItem } from './MaterialGroupItem';
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
          .filter(
            (item) =>
              query === '' ||
              item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.materialType.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((item) => <MaterialGroupItem key={item.id} item={item} />)
      )}
    </>
  );
};
