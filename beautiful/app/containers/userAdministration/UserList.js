/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import GridList from 'components/GridList';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getUserData, updateUserData } from './actions';
import { makeSelectData } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'userAdministration';

const columns = [
  { id: 1, name: 'col1', title: 'Column 1', width: 140, checked: true },
  { id: 2, name: 'col2', title: 'Column 2', width: 140, checked: true },
];

export function UserList(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [open, setOpen] = React.useState(false);
  const [col1, setCol1] = React.useState('');
  const [col2, setCol2] = React.useState('');
  const [rows] = React.useState(props.data);

  React.useEffect(() => {
    props.getData();
  }, []);

  const handleChange = event => {
    switch (event.target.name) {
      case 'col1':
        setCol1(event.target.value);
        break;
      case 'col2':
        setCol2(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newRow = {
      id: rows.length + 1,
      col1,
      col2,
    };
  };

  const handleAddItem = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditItem = (event, newRow) => {};

  const handleDeleteItem = (event, selectedItem) => {};

  const handleTextSearch = () => 'Tìm kiếm';

  return (
    <div>
      <GridList
        rows={rows}
        tableConfig={{ DEFAULT_COLUMNS: columns }}
        onLoadData={() => {}}
        count={rows.length}
        tableHeight={300}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onTextSearch={handleTextSearch}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thêm mới</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Input
              defaultValue="Hello world"
              inputProps={{ 'aria-label': 'description' }}
            />
            <Input
              placeholder="Placeholder"
              inputProps={{ 'aria-label': 'description' }}
            />

            <Button onClick={handleClose} color="primary">
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Lưu
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

UserList.propTypes = {
  getData: PropTypes.func,
  data: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(getUserData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserList);
