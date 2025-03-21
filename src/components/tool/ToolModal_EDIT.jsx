//Importy zewnętrzne
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
//Importy lokalne
import styles from './css/Tool.module.css';
import { useDispatch } from 'react-redux';
import { Dimensions } from './Dimensions';
import { toolValidationSchema } from './validationSchema/toolValidationSchema';
import { toolManager } from './service/toolManager';
import { SimpleImage } from './../common/SimpleImage';

export const ToolModal_EDIT = ({ onClose, item, toolListItem, updateTable }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: toolListItem.name,
      id: toolListItem.id,
      dc: toolListItem.dc,
      cfl: toolListItem.cfl,
      oal: toolListItem.oal,
      quantity: toolListItem.quantity,
      minQuantity: toolListItem.minQuantity,
      price: toolListItem.price,
      toolID: toolListItem.toolID,
      link: toolListItem.link,
      additionalInfo: toolListItem.additionalInfo,
      type: toolListItem.type,
      quantityInTransit: toolListItem.quantityInTransit
    },
    resolver: yupResolver(toolValidationSchema)
  });

  const handleForm = (data) => {
    const toolName = data.name;
    item.tools = item.tools.map((item) => (item.id == data.id ? data : item)); //update toolList
    toolManager.updateTool(data, toolName, queryClient, dispatch); //update tool in database
    updateTable(item.tools); //update table
    onClose(); //close modal
    reset(); //reset form
  };

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {item.type === 'others' ? (
          (item.fileImage && <SimpleImage fileObject={item.fileImage} />) || (
            <img src={require(`../../assets/no-image.png`)} alt="Tool diameter" />
          )
        ) : (
          <img src={require(`../../assets/tool_dimension/${item.type}.png`)} alt="Tool diameter" />
        )}
        <div className={styles.modal_header}>
          <h2>Update tool</h2>
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
              name="minQuantity"
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
                  label="Price"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={1}>
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
              name="toolID"
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
              name="link"
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
          <Stack spacing={1} mb={2}>
            <Controller
              name="additionalInfo"
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
                    border: error ? '1px solid #d32f2f' : '1px solid #ccc',
                    resize: 'none',
                    outline: 'none',
                    background: 'transparent',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  error={error}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={2} direction="row" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
              }}>
              Update
            </Button>
            <Button variant="text" size="large" onClick={onClose} sx={{ color: '#4a90e2' }}>
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
