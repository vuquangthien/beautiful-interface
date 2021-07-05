/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/CustomButtons';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  dataGrid: {
    width: '100%',
    height: 'calc(100vh - 300px)',
  },

  delete: {
    position: 'absolute',
    top: -4,
    left: 250,
  },

  footer: {
    position: 'absolute',
    top: 5,
    right: 20,
  },

  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function CustomTable({
  rows,
  columns,
  handleEditCellChangeCommitted,
  handleAddNew,
  handleUpdate,
}) {
  const [open, setOpen] = React.useState(false);
  // const apiRef = useGridApiRef();
  const [message, setMessage] = React.useState('');

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   return apiRef.current.subscribeEvent('columnResize', params => {
  //     setMessage(
  //       `Column ${params.colDef.headerName} resized to ${params.width}px.`,
  //     );
  //   });
  // }, [apiRef]);

  return (
    <div className={classes.root}>
      <div className={classes.dataGrid}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          localeText={{
            toolbarDensity: '',
            toolbarDensityCompact: 'Nhỏ',
            toolbarDensityStandard: 'Tiêu chuẩn',
            toolbarDensityComfortable: 'Lớn',
            toolbarFilters: '',
            toolbarFiltersTooltipShow: 'Mở bộ lọc',
            toolbarFiltersTooltipHide: 'Ẩn bộ lọc',
            toolbarColumns: '',
            toolbarExport: '',
            toolbarExportCSV: 'Xuất',
            // Columns panel text
            columnsPanelTextFieldLabel: 'Tìm cột',
            columnsPanelTextFieldPlaceholder: 'Tiêu đề cột',
            columnsPanelDragIconLabel: 'Sắp xếp lại cột',
            columnsPanelShowAllButton: 'Hiện tất cả',
            columnsPanelHideAllButton: 'Ẩn tất cả',
            // Filter panel text
            filterPanelAddFilter: 'Thêm bộ lọc',
            filterPanelDeleteIconLabel: 'Xóa',
            filterPanelOperators: 'Cách khai thác',
            filterPanelOperatorAnd: 'Và',
            filterPanelOperatorOr: 'Hoặc',
            filterPanelColumns: 'Cột',
            filterPanelInputLabel: 'Giá trị',
            filterPanelInputPlaceholder: 'Lọc giá trị',
            // Filter operators text
            filterOperatorContains: 'Chứa đựng',
            filterOperatorEquals: 'Bằng',
            filterOperatorStartsWith: 'Bắt đầu với',
            filterOperatorEndsWith: 'Kết thúc với',
            filterOperatorIs: 'Là',
            filterOperatorNot: 'Không là',
            filterOperatorAfter: 'là sau',
            filterOperatorOnOrAfter: 'là trên hoặc sau',
            filterOperatorBefore: 'là trước đây',
            filterOperatorOnOrBefore: 'là trên hoặc trước đó',
            // Column menu text
            columnMenuLabel: 'Menu',
            columnMenuShowColumns: 'Hiện các cột',
            columnMenuFilter: 'Bộ lọc',
            columnMenuHideColumn: 'Ẩn',
            columnMenuUnsort: 'Bỏ sắp xếp',
            columnMenuSortAsc: 'Sắp xếp bởi ASC',
            columnMenuSortDesc: 'Sắp xếp bởi DESC',
            // Rows selected footer text
            footerRowSelected: count =>
              count !== 1
                ? `${count.toLocaleString()} dòng đã chọn`
                : `${count.toLocaleString()} dòng đã chọn`,
            // Total rows footer text
            footerTotalRows: 'Tổng số hàng:',
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
        />
      </div>
      <Tooltip title="Xóa">
        <Button className={classes.delete} color="primary" justIcon link>
          <DeleteIcon color="primary" />
        </Button>
      </Tooltip>

      <Hidden mdDown>
        <div className={classes.footer}>
          <Button onClick={handleClickOpen} simple size="sm" color="primary">
            Thêm mới
          </Button>
          <Button onClick={handleUpdate} simple size="sm" color="primary">
            Cập nhật
          </Button>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.footerMobie}>
          <Button onClick={handleClickOpen} size="sm" simple color="primary">
            Thêm mới
          </Button>
          <Button onClick={handleUpdate} size="sm" simple color="primary">
            Cập nhật
          </Button>
        </div>
      </Hidden>

      <div>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Thêm mới</DialogTitle>
          <DialogContent dividers>
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy
            </Button>
            <Button onClick={handleAddNew} color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

CustomTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleEditCellChangeCommitted: PropTypes.func,
  handleAddNew: PropTypes.func,
  handleUpdate: PropTypes.func,
};
