import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useDispatch } from 'react-redux';
import { addCard } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';

export default function AddNewCardDialog(props) {
  const { selectedColumn, onClose, onAdd } = props;
  const [open, setOpen] = React.useState(false);
  const [addAtTheTop, setAddAtTheTop] = React.useState(true);
  const [title, setTitle] = React.useState();
  const [titleError, setTitleError] = React.useState(false);
  const [description, setDescription] = React.useState();
  const dispatch = useDispatch();

  if (selectedColumn != null && !open) {
    setOpen(true);
  }

  const handleCancel = () => {
    setTitleError(false);
    setTitle('');
    setOpen(false);
    onClose();
  };

  const handleAddCard = (event) => {
    event.preventDefault();
    if (!isBlank(title)) {
      dispatch(
        addCard({ title, description, columnId: selectedColumn.id, addAtTheTop })
      );
      setOpen(false);
      onAdd();
    } else {
      setTitleError(true);
    }
  };

  const titleChanged = (event) => {
    const newTitle = event.target.value;
    if (isBlank(newTitle)) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    setTitle(newTitle);
  };

  const descriptionChanged = (event) => {
    setDescription(event.target.value);
  };

  if (selectedColumn) {
    const theSwitch = (
      <Switch
        checked={addAtTheTop}
        onChange={() => setAddAtTheTop(!addAtTheTop)}
        color="secondary"
      />
    );
    return (
      <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth onClose={handleCancel}>
        <form onSubmit={handleAddCard}>
          <DialogTitle id="form-dialog-title">
            Add new card to Column:
            <strong>{selectedColumn.title}</strong>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out the details for your new card.
            </DialogContentText>
            <div style={{ marginTop: '10px' }}>
              <TextField
                error={titleError}
                fullWidth
                variant="outlined"
                placeholder="Card title"
                label="Title"
                helperText="Card title can't be empty"
                required
                onChange={titleChanged}
                inputRef={input => input && input.focus()}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                placeholder="Description"
                rows={4}
                label="Description"
                onChange={descriptionChanged}
              />
            </div>
            <FormGroup row>
              <FormControlLabel
                control={theSwitch}
                label="Add Card at the top of the Column"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  } else {

    return <span />;
  }
}
