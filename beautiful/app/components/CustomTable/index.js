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
            toolbarDensityCompact: 'Nh???',
            toolbarDensityStandard: 'Ti??u chu???n',
            toolbarDensityComfortable: 'L???n',
            toolbarFilters: '',
            toolbarFiltersTooltipShow: 'M??? b??? l???c',
            toolbarFiltersTooltipHide: '???n b??? l???c',
            toolbarColumns: '',
            toolbarExport: '',
            toolbarExportCSV: 'Xu???t',
            // Columns panel text
            columnsPanelTextFieldLabel: 'T??m c???t',
            columnsPanelTextFieldPlaceholder: 'Ti??u ????? c???t',
            columnsPanelDragIconLabel: 'S???p x???p l???i c???t',
            columnsPanelShowAllButton: 'Hi???n t???t c???',
            columnsPanelHideAllButton: '???n t???t c???',
            // Filter panel text
            filterPanelAddFilter: 'Th??m b??? l???c',
            filterPanelDeleteIconLabel: 'X??a',
            filterPanelOperators: 'C??ch khai th??c',
            filterPanelOperatorAnd: 'V??',
            filterPanelOperatorOr: 'Ho???c',
            filterPanelColumns: 'C???t',
            filterPanelInputLabel: 'Gi?? tr???',
            filterPanelInputPlaceholder: 'L???c gi?? tr???',
            // Filter operators text
            filterOperatorContains: 'Ch???a ?????ng',
            filterOperatorEquals: 'B???ng',
            filterOperatorStartsWith: 'B???t ?????u v???i',
            filterOperatorEndsWith: 'K???t th??c v???i',
            filterOperatorIs: 'L??',
            filterOperatorNot: 'Kh??ng l??',
            filterOperatorAfter: 'l?? sau',
            filterOperatorOnOrAfter: 'l?? tr??n ho???c sau',
            filterOperatorBefore: 'l?? tr?????c ????y',
            filterOperatorOnOrBefore: 'l?? tr??n ho???c tr?????c ????',
            // Column menu text
            columnMenuLabel: 'Menu',
            columnMenuShowColumns: 'Hi???n c??c c???t',
            columnMenuFilter: 'B??? l???c',
            columnMenuHideColumn: '???n',
            columnMenuUnsort: 'B??? s???p x???p',
            columnMenuSortAsc: 'S???p x???p b???i ASC',
            columnMenuSortDesc: 'S???p x???p b???i DESC',
            // Rows selected footer text
            footerRowSelected: count =>
              count !== 1
                ? `${count.toLocaleString()} d??ng ???? ch???n`
                : `${count.toLocaleString()} d??ng ???? ch???n`,
            // Total rows footer text
            footerTotalRows: 'T???ng s??? h??ng:',
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
        />
      </div>
      <Tooltip title="X??a">
        <Button className={classes.delete} color="primary" justIcon link>
          <DeleteIcon color="primary" />
        </Button>
      </Tooltip>

      <Hidden mdDown>
        <div className={classes.footer}>
          <Button onClick={handleClickOpen} simple size="sm" color="primary">
            Th??m m???i
          </Button>
          <Button onClick={handleUpdate} simple size="sm" color="primary">
            C???p nh???t
          </Button>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.footerMobie}>
          <Button onClick={handleClickOpen} size="sm" simple color="primary">
            Th??m m???i
          </Button>
          <Button onClick={handleUpdate} size="sm" simple color="primary">
            C???p nh???t
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
          <DialogTitle id="scroll-dialog-title">Th??m m???i</DialogTitle>
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
              H???y
            </Button>
            <Button onClick={handleAddNew} color="primary">
              L??u
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
