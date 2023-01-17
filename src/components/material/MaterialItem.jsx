import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import noImage from '../../assets/no-image.png';
import EditIcon from '@mui/icons-material/Edit';

export const MaterialItem = ({ item }) => {
  return (
    <Box width="300px">
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={item.picture ? item.picture : noImage}
          alt={item.materialGroupName}
        />
        <CardContent sx={{ height: '90px' }}>
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
          <Button startIcon={<EditIcon />} size="small" color="secondary">
            Edit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
