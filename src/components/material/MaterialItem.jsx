import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const MaterialItem = ({ item }) => {
  return (
    <Box width="300px">
      <Card>
        <CardMedia component="img" height="140" image={item.image} alt={item.name} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.type}
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
