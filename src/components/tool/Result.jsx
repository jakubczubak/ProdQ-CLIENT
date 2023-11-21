import { ToolGroupItem } from './ToolGroupItem';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data.json';
import styles from './css/Result.module.css';

export const Result = ({ data, query }) => {
  return (
    <>
      {!data.length ? (
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      ) : (
        data
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
