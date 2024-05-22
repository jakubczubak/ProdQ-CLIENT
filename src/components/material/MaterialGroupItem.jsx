// Zewnętrzne importy
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Lokalne importy
import noImage from '../../assets/no-image.png';
import styles from './css/MaterialItem.module.css';
import { MaterialGroupModal_EDIT } from './MaterialGroupModal_EDIT';
import { DeleteModal } from '../common/DeleteModal';
import { materialManager } from './service/materialManager';
import { showNotification } from '../common/service/showNotification';
import { setMaterialType } from '../../redux/actions/Action';

export const MaterialGroupItem = ({ item }) => {
  const isSelectMode = useSelector((state) => state.mode); // check if select mode is on
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [materialGroupValue, setMaterialGroupValue] = useState(0);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMaterialGroupValue(materialManager.calculateValueOfMaterialsInMaterialGroup(item));
  }, [item]);

  const handleDelete = () => {
    if (item.materials.length > 0) {
      setIsOpenDeleteModal(false);
      showNotification(
        'This material group has materials. Please delete them first.',
        'error',
        dispatch
      );

      return;
    } else {
      materialManager.deleteMaterialGroup(item.id, queryClient, dispatch);
      setIsOpenDeleteModal(false);
    }
  };

  const handleClick = () => {
    isSelectMode ? dispatch(setMaterialType(item)) : null; // set material type in redux
    navigate(`/materials/` + item.id);
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
            sx={{ height: 150, objectFit: 'contain', position: 'center' }}
          />
          <CardContent className={styles.material_item_content}>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.materialType.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.materialType.density + ' g/cm3'}
            </Typography>
            <p className={styles.value}>
              {materialGroupValue.toFixed(2)} <span className={styles.value_text}>PLN</span>
            </p>
          </CardContent>
          <CardActions>
            <Tooltip title="Check" placement="top">
              <Link to={`/materials/` + item.id} className={styles.link}>
                <Button size="small">Check</Button>
              </Link>
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
        <MaterialGroupModal_EDIT
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
          text={'material group'}
        />
      </Box>
    </>
  );
};
