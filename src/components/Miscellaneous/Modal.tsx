import React, { FC, useState } from 'react';
import { ModalProps } from '../../App.types';
import { Button, Container, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

const Modal: FC<ModalProps> = ({ errors, handleModal }) => {

  // Returns JSX relative to whether the errors are given in array or string format
  const [open, setOpen] = useState(errors.length > 0);

  const showErrors = () => {
    
    if (Array.isArray(errors)) {
      return errors.map(error => (
        <div key={error} className="error">{error}</div>
      ));
    }

    return (<div className="error">{errors}</div>);
  };

  return (
    <Container sx={{ mt:1 }}>
    
      <Dialog open={open} onClose={()=>handleModal()}>
          <DialogTitle></DialogTitle>
          <DialogContent>{showErrors()}</DialogContent>
          <Button  className="modal-btn" onClick={() => handleModal()}>Ok</Button>
      </Dialog>
    </Container>

  );
};

export default Modal;