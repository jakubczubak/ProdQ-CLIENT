import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Tooltip
} from '@mui/material';
import noImage from '../../assets/no-image.png';
import EditIcon from '@mui/icons-material/Edit';
import styles from './MaterialItem.module.css';
import { MaterialModal_EDIT } from './MaterialModal_EDIT';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteModal } from '../delete/DeleteModal';
import { materialManager } from './materialManager';
import { useQueryClient } from '@tanstack/react-query';

export const MaterialItem = ({ item, onSuccessDelete, onErrorDelete }) => {
  const [open, setOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = () => {
    materialManager.deleteMaterial(item.id, queryClient, onSuccessDelete, onErrorDelete);
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <Box className={styles.material_item}>
        <Card>
          <CardMedia
            component="img"
            className={styles.material_item_img}
            image={item.picture ? item.picture : noImage}
            alt={item.materialGroupName}
          />
          <CardContent className={styles.material_item_content}>
            <Typography variant="h6" gutterBottom>
              {item.materialGroupName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.materialGroupCode}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Check" placement="top">
              <Button size="small">Check</Button>
            </Tooltip>
            <Tooltip title="Out of stock" placement="top">
              <Button size="small">Out of stock</Button>
            </Tooltip>
            <Tooltip title="Edit" placement="top">
              <EditIcon
                color="action"
                fontSize="6px"
                onClick={() => setOpen(true)}
                className={styles.icon}
              />
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <DeleteIcon
                color="action"
                fontSize="6px"
                className={styles.icon}
                onClick={setIsOpenDeleteModal}
              />
            </Tooltip>
          </CardActions>
        </Card>
        <MaterialModal_EDIT open={open} onClose={() => setOpen(false)} item={item} />
        <DeleteModal
          open={isOpenDeleteModal}
          onCancel={() => {
            setIsOpenDeleteModal(false);
          }}
          onDelete={handleDelete}
          name={item.materialGroupName}
        />
      </Box>
    </>
  );
};
