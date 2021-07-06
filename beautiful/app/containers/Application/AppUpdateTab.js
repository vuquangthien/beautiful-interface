/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import GridList from 'components/GridList';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'components/CustomButtons';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Redux-saga
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectAppData } from './selectors';
import { appFetchRequested } from './actions';
import reducer from './reducer';
import saga from './saga';

// Kết nối tới store
const key = 'application';

const columns = [
  //   { name: 'sysId', title: 'ID', checked: true },
  { name: 'sysCode', title: 'Mã', checked: true },
  { name: 'sysName', title: 'Tên', checked: true },
  //   { name: 'createdDate', title: 'Ngày tạo', checked: true },
  //   { name: 'createdBy', title: 'Được tạo bởi', checked: true },
  //   { name: 'updateDate', title: 'Ngày cập nhật', checked: true },
  //   { name: 'updateBy', title: 'Cập nhật bởi', checked: true },
  { name: 'description', title: 'Mô tả', checked: true },
  //   { name: 'securityOption', title: 'Tùy chọn', checked: true },
  { name: 'status', title: 'Trạng thái', checked: true },
  //   { name: 'url', title: 'URL', checked: true },
];

const AppUpdateTab = ({ getAppData, appData }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [data, setData] = React.useState(appData);
  const [status, setStatus] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getAppData();
  }, []);

  React.useEffect(() => {
    setData(appData);
  }, [appData]);

  const handleChange = event => {
    setStatus(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewApp = () => {};

  const handleEditItem = () => {};

  const handleDeleteItem = () => {};

  return (
    <>
      <Paper style={{ padding: '10px 20px' }}>
        <Card variant="outlined">
          <CardHeader subheader="Thông tin tìm kiếm" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Mã ứng dụng"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Tên ứng dụng"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  select
                  value={status}
                  onChange={handleChange}
                  label="Trạng thái"
                >
                  <MenuItem value={0}>
                    <em>-------Tất cả-------</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button style={{ marginRight: 10 }} size="sm">
                  Tìm kiếm
                </Button>
                <Button size="sm" onClick={handleOpen}>
                  Thêm mới
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 10 }} variant="outlined">
          <CardHeader subheader="Danh sách các ứng dụng" />
          <CardContent>
            <GridList
              rows={data}
              //   showViewConfig={false}
              showCheckBox
              tableHeight={300}
              tableConfig={{ DEFAULT_COLUMNS: columns }}
              onLoadData={() => {}}
              onSelectItem={() => {}}
              count={data.length}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </CardContent>
        </Card>
      </Paper>

      {/* Hộp thoại thêm mới ứng dụng */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm mới ứng dụng</DialogTitle>
        <DialogContent>
          <Card variant="outlined">
            <CardHeader subheader="Thông tin ứng dụng" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    label="Mã ứng dụng"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Tên ứng dụng"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Trạng thái"
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                    value={status}
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>
                      <em>-------Tất cả-------</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Mô tả"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={6}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button onClick={handleAddNewApp} size="sm">
                    Ghi lại
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button size="sm" onClick={handleClose}>
                    Đóng
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

AppUpdateTab.propTypes = {
  getAppData: PropTypes.func,
  appData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  appData: makeSelectAppData(),
});

const mapDispatchToProps = dispatch => ({
  getAppData: () => dispatch(appFetchRequested()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  React.memo,
)(AppUpdateTab);
