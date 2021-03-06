/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, {
  useState,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Stepper,
  Step,
  Grid,
  StepButton,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';
import { Undo, NearMe, Send, Print } from '@material-ui/icons';
import FullscreenDialog from './FullscreenDialog';
import CustomTextField from '../CustomTextField';
import RequestConfirmDialog from './RequestConfirmDialog';
import useStyles from '../../utils/styles';
import CustomLabel from '../CustomLabel';
import GridList from '../GridList';
import { VIEW_CONFIG, sampleCode } from '../../utils/commonConfig';
import {
  RESPONSE_CODE,
  WF_RECEIVE_CODE,
  DATE_FORMAT,
  FUNCTION_PERMISSIONS_MAPPING,
} from '../../utils/constants';
import { taskTypes, receiveStatus, taskStatus } from '../../utils/workFlow';
import {
  convertToDateString,
  getSampleContents,
  getWorkflowIOFields,
  // getNoteFromHistories,
  findMinistryName,
  findBizServicesName,
  convertMsToTime,
  checkHasPermission,
} from '../../utils/common';
import CustomFab from '../CustomButtons/Fab';
import FieldList from '../FieldList';
import FilterTable from '../CustomTable/FilterTable';
import PrintRequest from '../PrintViewerPage';
import Permission from '../Permission';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
  };
}

export function ReceiveRequestDetailDialog(props) {
  const {
    onClose,
    open,
    onUpdateRequest,
    request,
    fieldNames,
    bizServices,
    ministries,
    isLoading,
    histories,
    finishTime,
    currentUser,
    onShowSnackbar,
  } = props;
  const {
    sourceTypeDisplayName,
    requestTypeDisplayName,
    requestType,
    filterGroups,
    createdDate,
    requestStatus,
    requestCodeInt,
    comments,
    note,
  } = request;

  const memorizedDate = useMemo(() => new Date(), [request]);
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [samples, setSamples] = useState([]);
  const [outputFields, setOutputFields] = useState([]);
  // const [note, setNote] = useState('');

  const [openPrintDialog, setOpenPrintDialog] = useState(false);

  const [dataPrint, setDataPrint] = useState({
    createdUserName: '',
    createdDate: '',
    sourceType: '',
    receivedDate: '',
    requestType: '',
    order: '',
    comment: '',
  });

  useEffect(() => {
    getWorkflowIOFields(requestType).then(results => {
      setOutputFields(results.outputFields);
    });
  }, [requestType]);

  useEffect(() => {
    if (!open) {
      setTabIndex(0);
    }
  }, [open]);
  const handleChangeTab = (e, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const handleOpenCancelDialog = () => {
    if (
      request.task.assigneeName !== currentUser.userName &&
      (request.requestStatus === WF_RECEIVE_CODE.DENIE_REQUEST ||
        request.requestStatus === WF_RECEIVE_CODE.RECEIVE_REQUEST)
    ) {
      onShowSnackbar({
        content: 'H??? s?? ???? ???????c t??i kho???n kh??c ti???p nh???n',
        variant: 'error',
      });
      return;
    }
    getSampleContents(sampleCode.return).then(data => setSamples(data));
    setOpenReturnDialog(true);
  };

  const handleOpenSendDialog = () => {
    if (
      request.task.assigneeName !== currentUser.userName &&
      (request.requestStatus === WF_RECEIVE_CODE.DENIE_REQUEST ||
        request.requestStatus === WF_RECEIVE_CODE.RECEIVE_REQUEST)
    ) {
      onShowSnackbar({
        content: 'H??? s?? ???? ???????c t??i kho???n kh??c ti???p nh???n',
        variant: 'error',
      });
      return;
    }
    getSampleContents(sampleCode.send).then(data => setSamples(data));
    setOpenSendDialog(true);
  };

  const handleReturnRequest = useCallback(
    response => {
      const data = {
        taskId: request.taskId,
        responseName: RESPONSE_CODE.RETURN_REQUEST,
        comment: response.comment,
      };
      onUpdateRequest(data);
      setOpenReturnDialog(false);
    },
    [request],
  );
  const parseCmt = () => {
    const newArr =
      histories &&
      [...histories].sort((a, b) => (a.finishedDate > b.finishedDate ? -1 : 1));
    return newArr && newArr[0] ? newArr[0].comments : '';
  };

  const handleReceiveRequest = useCallback(() => {
    const data = {
      taskId: request.taskId,
      responseName: RESPONSE_CODE.RECEIVE_HANDLE_REQUEST,
    };
    onUpdateRequest(data);
  }, [request]);
  const mapDataFunction = useCallback((column, value) => {
    if (column.name === 'taskType') {
      // console.log('taskType');
      const data = taskTypes.find(r => r.code === value);
      // console.log(data);
      return data ? data.displayName : value;
    }
    if (column.name === 'status') {
      const statusDisplayName = taskStatus[value];
      if (statusDisplayName) return statusDisplayName;
    }
    return value;
  }, []);
  const handleSendRequest = useCallback(
    response => {
      const data = {
        taskId: request.taskId,
        responseName: RESPONSE_CODE.SEND_REQUEST,
        comment: response.comment,
      };
      onUpdateRequest(data);
      setOpenSendDialog(false);
    },
    [request],
  );

  const handleCloseReturnDialog = useCallback(() => {
    setOpenReturnDialog(false);
  }, []);

  const handleCloseSendDialog = useCallback(() => {
    setOpenSendDialog(false);
  }, []);

  const handleOpenPreviewDialog = comment => {
    console.log('vcl');
    // handleCloseSendDialog();
    setOpenPrintDialog(true);
    setDataPrint({
      createdUserName: request.createdUserName,
      createdDate: request.createdDate,
      sourceType: findMinistryName(ministries, request.sourceType),
      receivedDate: request.receivedDate,
      requestType: findBizServicesName(bizServices, request.requestType),
      order: request.order,
      comment,
    });
  };

  const handleClosePreviewDialog = () => {
    setOpenPrintDialog(false);
  };

  const renderMinistry = code => {
    const item = ministries && ministries.find(b => b.ministryCode === code);
    return item ? item.ministryName : '';
  };

  const extendIcons = useCallback(
    () => (
      <Fragment>
        <Permission
          permission={FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.RETURN}
        >
          <CustomFab
            onClick={handleOpenCancelDialog}
            disabled={isLoading}
            tooltip="G???i tr???"
          >
            <Undo color="primary" size="small" />
          </CustomFab>
        </Permission>
        {request &&
          request.requestStatus === WF_RECEIVE_CODE.WAITING_RECEIVE_REQUEST && (
            <Permission
            permission={FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.RECEIVE}
          >
            <CustomFab
              onClick={handleReceiveRequest}
                disabled={isLoading && filterGroups.length > 0}
                tooltip="Ti???p nh???n"
                style={{ marginLeft: 10 }}
            >
                <NearMe color="primary" size="small" />
            </CustomFab>
          </Permission>
          )}
        <Permission
          permission={
            FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.RECEIVE_APPROVAL
          }
        >
          <CustomFab
            onClick={handleOpenSendDialog}
            disabled={isLoading && filterGroups.length > 0}
            tooltip={
              request.requestStatus === WF_RECEIVE_CODE.WAITING_RECEIVE_REQUEST
                ? 'Ti???p nh???n v?? g???i ph?? duy???t'
                : 'G???i ph?? duy???t'
            }
            style={{ marginLeft: 10 }}
          >
            <Send color="primary" size="small" />
          </CustomFab>
        </Permission>
      </Fragment>
    ),
    [request],
  );
  const extraAction = useCallback(
    comment => (
      <>
        <Permission
          permission={
            FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.PRINT_SUGGEST_APPROVAL
          }
        >
          <Button
            startIcon={<Print />}
            size="small"
            onClick={() => handleOpenPreviewDialog(comment)}
            color="secondary"
            variant="contained"
          >
            In
          </Button>
        </Permission>
      </>
    ),
    [request],
  );

  // TT - CSS : HEIGH TABLE : 4 CASE
  let tableHeightCase = 246; // TH1.T + T = DEFAULT
  if (!(requestStatus === 'WS_TH_PD_TC') && !note) {
    tableHeightCase = 96; // TH2.F + F
  }
  if (!(requestStatus === 'WS_TH_PD_TC') && !!note) {
    tableHeightCase = 129; // TH3.F + T
  }
  if (!!(requestStatus === 'WS_TH_PD_TC') && !note) {
    tableHeightCase = 213; // TH4.T + F
  }

  return (
    <FullscreenDialog
      title="Xem chi ti???t y??u c???u"
      open={open}
      onClose={onClose}
      extendIcons={extendIcons}
    >
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        // variant="fullWidth"
        value={tabIndex || 0}
        onChange={handleChangeTab}
        arial-label=""
      >
        <Tab label="Xem chi ti???t" {...a11yProps(0)} />
        {checkHasPermission(
          props.currentUser,
          FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.HISTORY,
        ) && <Tab label="L???ch s???" {...a11yProps(1)} />}
        {/* <Permission
          permission={FUNCTION_PERMISSIONS_MAPPING.RECEIVE_PAGE.HISTORY}
        >
          <Tab label="L???ch s???" {...a11yProps(1)} />
        </Permission> */}
      </Tabs>
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.defaultPaperDetailReceiveRequests}>
              {/* C??CH M???I : PA 4 : task c???a L???A - ?????I TEXTBOX - TH??NH PAPER GRID - ch???t */}
              <Paper
                className={classes.control}
                style={{ margin: '0px 0px 2px' }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {/* dong 1 */}
                    <Grid container justify="space-between">
                      <Grid item>
                        <CustomLabel
                          label="B??? ng??nh"
                          value={sourceTypeDisplayName}
                        />
                      </Grid>
                      <Grid item>
                        <CustomLabel label="M?? h??? s??" value={requestCodeInt} />
                      </Grid>
                      <Grid item>
                        <CustomLabel
                          label="Ng??y y??u c???u"
                          value={convertToDateString(
                            createdDate,
                            DATE_FORMAT.DATE_TIME,
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <CustomLabel
                          label="Nghi???p v???"
                          value={requestTypeDisplayName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* dong 2 : n???u c?? ghi ch?? m???i hi???n th??? d??ng n??y */}
                  {note && (
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <>
                            <CustomLabel label="Ghi ch??" value={note} />
                          </>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {/* D??NG 3 : H???P "?? ki???n t??? ch???i ph?? duy???t" - ch??? hi???n th??? v???i h??? s?? c?? TR???NG TH??I = "T??? CH???I PH?? DUY???T" */}
                {requestStatus === 'WS_TH_PD_TC' && (
                  <Grid item xs={12} style={{ marginTop: '1rem' }}>
                    <CustomTextField
                      readOnly
                      multiline
                      rows={4}
                      label="?? ki???n t??? ch???i ph?? duy???t"
                      value={parseCmt() || ''}
                    />
                  </Grid>
                )}
              </Paper>
              {/* H???T : task c???a L???A - ?????I TEXTBOX - TH??NH PAPER GRID */}

              <Stepper nonLinear>
                {receiveStatus.map(status => (
                  <Step key={status.code}>
                    <StepButton
                      active={status.code === requestStatus}
                      completed={status.code === requestStatus}
                    >
                      {status.displayName}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <Grid
                container
                spacing={5}
                // TT
                style={{
                  marginTop: '-16px',
                  height: `calc(100% - ${tableHeightCase}px)`,
                }}
              >
                <Grid
                  item
                  xs={9}
                  style={{ height: '100%', overflowY: 'hidden' }}
                >
                  <Grid
                    style={{ height: '100%' }}
                    container
                    className={classes.root}
                  >
                    <Typography
                      style={{ fontSize: '0.875 rem', fontWeight: 'Bold' }}
                    >
                      Danh s??ch ??i???u ki???n t??ch h???p
                    </Typography>
                    <FilterTable
                      fieldNames={fieldNames}
                      filterGroups={filterGroups}
                      classes={classes}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ height: '100%', paddingBottom: '0' }}
                >
                  <FieldList
                    // leftList={inputFields}
                    // leftTitle="D??? li???u ?????u v??o"
                    rightTitle="D??? li???u ?????u ra"
                    rightList={outputFields}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Paper className={classes.defaultPaperDetailReceiveRequests}>
          <Fragment>
            <Grid container spacing={3} justify="space-between">
              <Grid item>
                <CustomLabel
                  label="B??? ng??nh"
                  value={request && renderMinistry(request.sourceType)}
                />
              </Grid>
              <Grid item>
                <CustomLabel label="M?? h??? s??" value={requestCodeInt} />
              </Grid>
              <Grid item>
                <CustomLabel
                  label="Ng??y y??u c???u"
                  value={
                    request &&
                    convertToDateString(
                      request.createdDate,
                      DATE_FORMAT.DATE_TIME,
                    )
                  }
                />
              </Grid>
              <Grid item>
                <CustomLabel
                  label="Th???i gian th???c hi???n"
                  value={
                    request.finishedDate
                      ? convertMsToTime(
                        request.finishedDate - request.createdDate,
                      )
                      : convertMsToTime(memorizedDate * 1 - request.createdDate)
                  }
                />
              </Grid>
            </Grid>
            {/* <TableContainer component={Paper}> */}
            <GridList
              tableConfig={VIEW_CONFIG.REQUEST_HISTORY}
              // isLoading={isLoading}
              rows={histories}
              count={histories.length}
              mapDataFunction={mapDataFunction}
              // onLoadData={handleLoadData}
              // onChangeSorting={handleSortData}
              showPagination={false}
              showViewConfig={false}
            />
            {/* <Typography
              component="h5"
              style={{ fontWeight: 'bold', marginTop: '1rem' }}
            >
              K???t qu??? t??ch h???p
            </Typography>

            <GridList
              tableConfig={VIEW_CONFIG.REQUEST_RESULT_INT}
              // isLoading={isLoading}
              rows={histories}
              count={histories.length}
              mapDataFunction={mapDataFunction}
              // onLoadData={handleLoadData}
              // onChangeSorting={handleSortData}
              showViewConfig={false}
              showPagination={false}
              tableHeight={600}
            /> */}
            {/* </TableContainer> */}
          </Fragment>
        </Paper>
      )}
      <RequestConfirmDialog
        samples={samples}
        title="L?? do g???i tr??? h??? s??"
        open={openReturnDialog}
        onClose={handleCloseReturnDialog}
        onSave={handleReturnRequest}
      />
      <RequestConfirmDialog
        samples={samples}
        title="????? xu???t ph?? duy???t h??? s??"
        open={openSendDialog}
        onClose={handleCloseSendDialog}
        onSave={handleSendRequest}
        extraAction={extraAction}
      />
      <FullscreenDialog
        title="In phi???u ????? xu???t ph?? duy???t"
        open={openPrintDialog}
        onClose={handleClosePreviewDialog}
      >
        <PrintRequest
          onClose={handleClosePreviewDialog}
          profile={request}
          data={dataPrint}
        />
      </FullscreenDialog>
    </FullscreenDialog>
  );
}

ReceiveRequestDetailDialog.propTypes = {
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onUpdateRequest: PropTypes.func,
  request: PropTypes.object,
  bizServices: PropTypes.array,
  ministries: PropTypes.array,
  fieldNames: PropTypes.array,
};

export default memo(ReceiveRequestDetailDialog);
