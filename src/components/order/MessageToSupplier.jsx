//Importy zewnętrzne
import { Controller } from 'react-hook-form';
import { TextareaAutosize, IconButton, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
//Importy lokalne
import styles from './css/OrderItem.module.css';

export const MessageToSupplier = ({ control, state, handleAutoMessage, handleGenerateEmail }) => {
  return (
    <div>
      <h3 className={styles.order_header}>
        Message to supplier{' '}
        <Tooltip title="Generate auto message" placement="top">
          <IconButton onClick={handleAutoMessage} disabled={state ? true : false}>
            <AutoAwesomeIcon />
          </IconButton>
        </Tooltip>
      </h3>
      <Controller
        name="supplierMessage"
        control={control}
        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
          <TextareaAutosize
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Hi, I would like to order..."
            minRows={10}
            maxRows={12}
            disabled={state ? true : false}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'none',
              outline: 'none',
              backgroundColor: 'inherit',
              color: '#52565e'
            }}
            error={error}
          />
        )}
      />
      <div className={styles.send_icon}>
        <Tooltip title="Email" placement="left">
          <span>
            <IconButton
              aria-label="send"
              onClick={handleGenerateEmail}
              disabled={state ? true : false}>
              <SendIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};
