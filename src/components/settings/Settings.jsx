import React from 'react';
import styles from './css/Settings.module.css';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Breadcrumbs, Typography } from '@mui/material';
import { useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { UserList } from './UserList';
import { UserDetails } from './UserDetails';
import { showNotification } from '../../components/common/service/showNotification';
import { useDispatch } from 'react-redux';
import { Contact } from './Contact';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { DepartmentCost } from './DepartmentCost';
import { departmentCostManager } from './service/departmentCostManager';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const Settings = () => {
  const [value, setValue] = useState('1');

  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  const { data, isLoading, isError } = useQuery(
    ['defaultDepartmentCost'],
    departmentCostManager.getDefaultDepartmentCost
  ); // fetch default department cost

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    if (userFromLocalStorage.role === 'user') {
      showNotification('Access denied!', 'error', dispatch);
      return;
    }
    setValue(newValue);
  };
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>

        <Typography color="text.primary">Settings</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Settings
        </Typography>
      </div>

      <div className={styles.settings_container}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="Tabs example">
              <Tab label="Profile" value="1" icon={<PersonRoundedIcon />} iconPosition="end" />
              <Tab
                label="Users list"
                value="2"
                icon={<AdminPanelSettingsIcon />}
                iconPosition="end"
              />
              <Tab label="Department Cost" value="3" icon={<SettingsIcon />} iconPosition="end" />
              <Tab label="Info" value="4" icon={<InfoIcon />} iconPosition="end" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UserDetails />
          </TabPanel>
          <TabPanel value="2">
            <UserList />
          </TabPanel>

          <TabPanel value="3">
            {isLoading && <Loader />}
            {isError && <Error message={'Error fetch department cost. Please try again later!'} />}
            {data && !isError && !isError && <DepartmentCost defaultValues={data} />}
          </TabPanel>

          <TabPanel value="4">
            <Contact />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};
