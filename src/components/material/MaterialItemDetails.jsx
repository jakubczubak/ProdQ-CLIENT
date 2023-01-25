import styles from './MaterialItemDetails.module.css';
import { useParams } from 'react-router-dom';

export const MaterialItemDetails = () => {
  let { id } = useParams();
  return <div>MaterialItemDetails ID: {id}</div>;
};
