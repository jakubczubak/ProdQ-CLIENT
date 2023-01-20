import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import noImage from '../../assets/no-image.png';
import EditIcon from '@mui/icons-material/Edit';
import styles from './MaterialItem.module.css';
import { MaterialModal_EDIT } from './MaterialModal_EDIT';
import { useState } from 'react';

export const MaterialItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
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
          <Button size="small">Check</Button>
          <Button size="small">Out of stock</Button>
          <Button
            startIcon={<EditIcon />}
            size="small"
            color="secondary"
            onClick={() => setOpen(true)}>
            Edit
          </Button>
        </CardActions>
      </Card>
      <MaterialModal_EDIT open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
