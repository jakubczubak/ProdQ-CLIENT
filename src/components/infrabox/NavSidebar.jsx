import React from 'react'
import { Drawer, Box, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'

export const NavSidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  return (
    <>
    <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)}>
      <MenuIcon />
    </IconButton>
    <Drawer variant="temporary"
  ModalProps={{
    keepMounted: false,
  }} anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Box p={2} width='250px' textAlign='center' role='presentation'>
        <Typography variant='h5'>INFRABOX</Typography>
      </Box>
    </Drawer>
    </>
    
  )
}
