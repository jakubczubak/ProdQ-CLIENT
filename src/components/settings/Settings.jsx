import React from 'react';
import styles from './css/Settings.module.css';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Breadcrumbs, Typography } from '@mui/material';
import { useState } from 'react';
import { UserList } from './UserList';
import { UserDetails } from './UserDetails';
import { Contact } from './Contact';
import { DepartmentCost } from './DepartmentCost';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FitbitOutlinedIcon from '@mui/icons-material/FitbitOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { MaterialTypeList } from '../materialType/MaterialTypeList';

export const Settings = ({ tab }) => {
  const [value, setValue] = useState(tab ? tab : '1');

  const handleChange = (event, newValue) => {
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
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile>
              <Tab label="My profile" value="1" icon={<BadgeOutlinedIcon />} iconPosition="end" />
              <Tab label="User list" value="2" icon={<PeopleOutlinedIcon />} iconPosition="end" />
              <Tab
                label="Material types"
                value="3"
                icon={<FitbitOutlinedIcon />}
                iconPosition="end"
              />
              <Tab
                label="Department cost"
                value="4"
                icon={<SettingsSuggestOutlinedIcon />}
                iconPosition="end"
              />
              <Tab label="About" value="5" icon={<InfoOutlinedIcon />} iconPosition="end" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UserDetails />
          </TabPanel>
          <TabPanel value="2">
            <UserList />
          </TabPanel>
          <TabPanel value="3">
            <MaterialTypeList />
          </TabPanel>
          <TabPanel value="4">
            <DepartmentCost />
          </TabPanel>

          <TabPanel value="5">
            <Contact />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};
