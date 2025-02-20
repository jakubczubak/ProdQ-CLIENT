import { Button, Tooltip, IconButton } from '@mui/material';
import { AccessTime as AccessTimeIcon, DownloadOutlined as DownloadOutlinedIcon, SyncOutlined as SyncOutlinedIcon } from '@mui/icons-material';
import { NCProgram } from './NCProgram';
import styles from './css/productionQueue.module.css';

export const Machine = ({ machine }) => {
  const buttonStyles = {
    fontSize: '16px',
    color: 'gray',
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'transparent' },
  };

  return (
    <div className={styles.machine_card}>
      <img className={styles.machine_img} src={machine.imageSrc} alt={machine.altText} />
      <h3 className={styles.machine_name}>{machine.machineName}</h3>
      <Button variant="text" startIcon={<AccessTimeIcon />} size="small" disableRipple sx={buttonStyles}>
        {machine.totalTime}
      </Button>
      <div className={styles.machine_programs}>
   
      </div>
      <div className={styles.machine_btn}>
        <Tooltip title="Generate queue">
          <IconButton aria-label="download">
            <DownloadOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sync queue">
          <IconButton aria-label="sync">
            <SyncOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
