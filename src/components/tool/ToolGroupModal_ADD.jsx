import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/ToolModal.module.css';
import { styled } from '@mui/material/styles';
import { Stack, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toolGroupValidationSchema } from './validationSchema/toolGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toolManager } from './service/toolManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { MuiFileInput } from 'mui-file-input';

const MuiFileInputStyled = styled(MuiFileInput)`
  & .MuiInputBase-root {
    cursor: pointer;
  }
  & .MuiInputBase-input {
    cursor: pointer;
  }

  & input + span {
    cursor: pointer;
  }
`;

export const ToolGroupModal_ADD = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      type: '',
      file: undefined
    },
    resolver: yupResolver(toolGroupValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    const formData = new FormData();
    if (data.file) {
      formData.append('file', data.file);
    }

    formData.append('name', data.name);
    formData.append('type', data.type);
    onClose(); //close modal
    reset(); //reset form
    toolManager.createToolGroup(formData, queryClient, dispatch); //post tool group to database
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <img
            className={styles.modal_img}
            src={require('../../assets/tools.png')}
            alt="Tool diameter"
          />

          <div className={styles.modal_header}>
            <h2>Tool groups</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="End mill VHM"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Tool group name"
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <FormControl fullWidth error={error}>
                    <InputLabel id="select-label">Type of tool group</InputLabel>
                    <Select
                      labelId="select-label"
                      style={{ textAlign: 'left' }}
                      value={value}
                      onBlur={onBlur}
                      label="Type of tool group"
                      onChange={onChange}>
                      <MenuItem value={'ball_cutter'}>Ball cutter</MenuItem>
                      <MenuItem value={'ball_end_mill'}>Ball end mill</MenuItem>
                      <MenuItem value={'boring_bar'}>Boring bar</MenuItem>
                      <MenuItem value={'chamfer_drill'}>Chamfer drill</MenuItem>
                      <MenuItem value={'conical_hole_deepener'}>Conical hole deepener</MenuItem>
                      <MenuItem value={'counterbore_drill'}>Counterbore drill</MenuItem>
                      <MenuItem value={'countersink'}>Countersink</MenuItem>
                      <MenuItem value={'dovetail_end_mill'}>Dovetail end mill</MenuItem>
                      <MenuItem value={'drill'}>Drill</MenuItem>
                      <MenuItem value={'end_mill'}>End mill</MenuItem>
                      <MenuItem value={'engraving_cutter'}>Engraving cutter</MenuItem>
                      <MenuItem value={'milling_cutter_head'}>Milling cutter head</MenuItem>
                      <MenuItem value={'milling_cutters'}>Milling cutters</MenuItem>
                      <MenuItem value={'others'}>Others</MenuItem>
                      <MenuItem value={'quartering_cutter'}>Quartering cutter</MenuItem>
                      <MenuItem value={'radius_end_mill'}>Radius end mill</MenuItem>
                      <MenuItem value={'reamer'}>Reamer</MenuItem>
                      <MenuItem value={'rounded_tapered_end_mill'}>
                        Rounded tapered end mill
                      </MenuItem>
                      <MenuItem value={'saw'}>Saw</MenuItem>
                      <MenuItem value={'t_slot_milling_cutter'}>T-slot milling cutter</MenuItem>
                      <MenuItem value={'tapered_end_mill'}>Tapered end mill</MenuItem>
                      <MenuItem value={'tapered_thread_milling_cutter'}>
                        Tapered thread milling cutter
                      </MenuItem>
                      <MenuItem value={'thread_milling_cutter'}>Thread milling cutter</MenuItem>
                      <MenuItem value={'tap'}>Tap</MenuItem>
                      <MenuItem value={'turning_inserts'}>Turning inserts</MenuItem>
                      <MenuItem value={'turning_tools'}>Turning tools</MenuItem>
                    </Select>
                    {error && <p className={styles.error}>{error.message}</p>}
                  </FormControl>
                )}
              />

              <Controller
                name="file"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <MuiFileInputStyled
                    label="Upload image file (optional)"
                    type="file"
                    clearIconButtonProps={{
                      title: 'Remove',
                      children: <CloseIcon fontSize="small" />
                    }}
                    onChange={() => onChange(event.target.files[0])}
                    onBlur={onBlur}
                    value={value}
                    error={error ? true : false}
                    helperText={error ? error.message : ''}
                    InputProps={{
                      inputProps: {
                        accept: '.jpg,.jpeg,.png'
                      },
                      startAdornment: <AttachFileIcon />
                    }}
                  />
                )}
              />
              <Button type="submit" variant="contained" size="large">
                Create
              </Button>
              <Button variant="text" size="large" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};
