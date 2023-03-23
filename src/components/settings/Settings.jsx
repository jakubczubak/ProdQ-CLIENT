import React from 'react';
import styles from './css/Settings.module.css';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { UserList } from './UserList';
import { UserDetails } from './UserDetails';

export const Settings = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={styles.settings_container}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Tabs example">
            <Tab label="My profile" value="1" />
            <Tab
              label="Users list"
              value="2"
              icon={<AdminPanelSettingsIcon />}
              iconPosition="end"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserDetails />
        </TabPanel>
        <TabPanel value="2">
          <UserList />
        </TabPanel>
      </TabContext>
    </div>
  );
};
