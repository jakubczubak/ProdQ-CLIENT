import styles from './css/Tool.module.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { Dimensions } from './Dimensions';
import { toolValidationSchema } from './validationSchema/toolValidationSchema';
import { useDispatch } from 'react-redux';
import { toolManager } from './service/toolManager';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/add.json';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export const ToolModal_ADD = ({ open, onClose, item }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      dc: '',
      cfl: '',
      oal: '',
      quantity: '',
      min_quantity: '',
      price: '',
      tool_id: '',
      e_shop_link: '',
      additional_info: '',
      parent_id: item.id,
      type: 'tool',
      quantity_in_transit: 0
    },
    resolver: yupResolver(toolValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    data.id = item.toolList.length + 1;
    item.toolList.push(data);
    const toolName = data.name;

    toolManager.createTool(item, toolName, queryClient, dispatch);
    onClose();
    reset();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {item.toolGroupType === 'others' ? (
          <Lottie animationData={animation} loop={true} className={styles.modal_animation} />
        ) : (
          <img
            src={require(`../../assets/tool_dimension/${item.toolGroupType}.png`)}
            alt="Tool diameter"
          />
        )}
        <div className={styles.modal_header}>
          <h2>Tool details</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Dimensions control={control} />
          <Stack spacing={1} mt={2} mb={2} className={styles.login_content} direction="row">
            <Controller
              name="quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="min_quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Min. quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="100"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Price net"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={1}>
            <Controller
              name="additional_info"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextareaAutosize
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Additional info"
                  minRows={2}
                  maxRows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    resize: 'none',
                    outline: 'none',
                    backgroundColor: 'inherit'
                  }}
                  error={error}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={3}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="END MILL 4 FLUTE"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Tool name"
                />
              )}
            />
            <Controller
              name="tool_id"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="WNT 10105"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Tool ID"
                />
              )}
            />
            <Controller
              name="e_shop_link"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="https://cuttingtools.ceratizit.com/pl/pl.html"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="e-Shop link"
                />
              )}
            />
          </Stack>

          <Button type="submit" variant="contained" size="large">
            Create
          </Button>
          <Button variant="text" size="large" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
