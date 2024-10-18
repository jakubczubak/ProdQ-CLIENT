import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Tooltip,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useEffect } from 'react';
import { AccessorieGroupModal } from './AccessorieGroupModal';
import { DeleteModal } from '../common/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '../common/service/showNotification';
import noImage from '../../assets/no-image.png';
import styles from './css/AccessorieItem.module.css';
import { accessorieManager } from './service/AccessorieManager';
import { useNavigate } from 'react-router-dom';

export const AccessorieItem = ({ item }) => {
  const isSelectMode = useSelector((state) => state.mode); // check if select mode is on
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [accessorieGroupValue, setAccessorieGroupValue] = useState(0);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAccessorieGroupValue(accessorieManager.calculateAccessorieGroupValue(item));
  }, [item]);

  const handleDelete = () => {
    if (item.accessorieItems.length > 0) {
      setIsOpenDeleteModal(false);
      showNotification(
        'This accessories group has accessories. Please delete them first.',
        'error',
        dispatch
      );

      return;
    } else {
      accessorieManager.deleteAccessorie(item.id, queryClient, dispatch);
      setIsOpenDeleteModal(false);
    }
  };

  const handleClick = () => {
    navigate(`/accessories/${item.id}`);
  };

  return (
    <>
      <Box className={styles.material_item}>
        <Card>
          <CardMedia
            onClick={handleClick}
            component="img"
            image={
              item.fileImage
                ? `data:${item.fileImage.type};base64,${item.fileImage.imageData}`
                : noImage
            }
            alt={item.name}
            sx={{
              height: 150,
              objectFit: 'contain',
              position: 'center',
              padding: '10px',
              backgroundColor: '#fafafa'
            }}
          />
          <CardContent className={styles.material_item_content}>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <p className={styles.value}>
              {accessorieGroupValue.toFixed(2)} <span className={styles.value_text}>PLN</span>
            </p>
          </CardContent>
          <CardActions>
            <Tooltip title="Check" placement="top">
              <Button
                size="small"
                onClick={() => {
                  handleClick();
                }}
              >
                Check
              </Button>
            </Tooltip>
            {!isSelectMode && (
              <>
                <Tooltip title="Edit" placement="top">
                  <EditIcon
                    color="action"
                    fontSize="6px"
                    onClick={() => setOpenEditModal(true)}
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
              </>
            )}
          </CardActions>
        </Card>
        <AccessorieGroupModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          item={item}
        />
        <DeleteModal
          open={isOpenDeleteModal}
          onCancel={() => {
            setIsOpenDeleteModal(false);
          }}
          onDelete={handleDelete}
          name={item.name}
          text={'accessorie group'}
        />
      </Box>
    </>
  );
};
