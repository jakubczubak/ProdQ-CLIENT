// Zewnętrzne importy
import {
  SpeedDial,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { SpeedDialIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';

// Lokalne importy
import styles from './css/productionQueue.module.css';

export const ProductionQueue = () => {
  const [isOpen, setIsOpen] = useState(); // open the modal for material group
  const [query, setQuery] = useState(''); // query for search
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography color="text.primary">Production</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Production Manager
        </Typography>
      </div>
      <Tooltip title="Search" placement="right">
        <TextField
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          InputProps={{
            className: styles.search_input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Tooltip>
      <div className={styles.production_container}>
        <div className={styles.nc_programs_container}>
          <h2 className={styles.header}>NC Programs</h2>
          <div className={styles.nc_programs}>
            <div className={styles.nc_programs_item}>
              <div className={styles.nc_programs_item_info}>
                <Button
                  variant="text"
                  startIcon={<SubtitlesOutlinedIcon />}

                  disableRipple
                  sx={{
                    fontSize: '16px',
                    color: '#5f5f5f',
                    textTransform: 'none',
                    backgroundColor: 'transaprent',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  1_MRW_2asdasdasdasda
                </Button>
                <Button
                  variant="text"


                  startIcon={<FunctionsOutlinedIcon />}
                  size="small"
                  disableRipple
                  sx={{
                    color: 'gray',
                    textTransform: 'none',
                    backgroundColor: 'transaprent',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  1szt.
                </Button>
                <Button
                  variant="text"
                  startIcon={<AccessTimeIcon />}
                  size="small"
                  disableRipple
                  sx={{
                    textTransform: 'none',
                    color: 'gray',
                    backgroundColor: 'transaprent',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  2h:51min
                </Button>
                <Button
                  variant="text"
                  startIcon={<ReportProblemOutlinedIcon />}
                  size="small"
                  disableRipple
                  sx={{
                    textTransform: 'none',
                    color: 'gray',
                    backgroundColor: 'transaprent',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  01.03.2025r.
                </Button>

              </div>
              <div className={styles.nc_programs_item_btn}>
     
                <DeleteOutlinedIcon color='action'/>
              </div>

            </div>
          </div>
        </div>

        {/* <div class="production-queue">
          <h2>Production queue</h2>
          <div class="machine-queue">
            <div class="machine-card">
              <img src="machine1.png" alt="BACA 1" />
              <h3>BACA 1</h3>
              <small>2h:21min</small>
              <div class="machine-programs">
                <div class="program-card">...</div>
              </div>
            </div>
            <div class="machine-card">
              <img src="machine2.png" alt="BACA 2" />
              <h3>BACA 2</h3>
              <small>2h:21min</small>
              <div class="machine-programs">
                <div class="program-card">...</div>
              </div>
            </div>
            <div class="machine-card">
              <img src="machine3.png" alt="VENUS" />
              <h3>VENUS</h3>
              <small>2h:21min</small>
              <div class="machine-programs">
                <div class="program-card">...</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Tooltip title="Add new NC Program" placement="left">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Add new NC program"
          sx={speedDialStyles}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1000
};
