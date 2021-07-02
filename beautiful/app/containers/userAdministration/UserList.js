/* eslint-disable prettier/prettier */
import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
// import CustomInput from 'components/CustomInput';
import Button from 'components/CustomButtons';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
// import CardAvatar from 'components/Card/CardAvatar';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  TableColumnVisibility,
  ColumnChooser,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import saveAs from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';

const getHiddenColumnsFilteringExtensions = hiddenColumnNames =>
  hiddenColumnNames.map(columnName => ({
    columnName,
    predicate: () => false,
  }));

const onSave = workbook => {
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(
      new Blob([buffer], { type: 'application/octet-stream' }),
      'DataGrid.xlsx',
    );
  });
};

export default function UserList(props) {
  const { classes, rows, columns } = props;
  const [pageSizes] = useState([10, 20, 50, 100]);
  const [defaultHiddenColumnNames] = useState([]);

  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);
  const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
    getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
  );

  const onHiddenColumnNamesChange = hiddenColumnNames =>
    setFilteringColumnExtensions(
      getHiddenColumnsFilteringExtensions(hiddenColumnNames),
    );

  return (
    <GridItem xs={12} sm={12} md={8}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Quản trị người dùng</h4>
          <p className={classes.cardCategoryWhite}>Danh sách người dùng</p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <Grid rows={rows} columns={columns}>
              <SearchState defaultValue="" />
              <IntegratedFiltering
                columnExtensions={filteringColumnExtensions}
              />
              <PagingState defaultCurrentPage={0} defaultPageSize={10} />
              <IntegratedPaging />
              <SortingState
                defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
              />
              <IntegratedSorting />
              <Table />
              <TableHeaderRow showSortingControls />
              <PagingPanel pageSizes={pageSizes} />
              <TableColumnVisibility
                defaultHiddenColumnNames={defaultHiddenColumnNames}
                onHiddenColumnNamesChange={onHiddenColumnNamesChange}
              />
              <Toolbar />
              <SearchPanel />
              <ColumnChooser />
              <ExportPanel startExport={startExport} />
            </Grid>
            <GridExporter
              ref={exporterRef}
              rows={rows}
              columns={columns}
              onSave={onSave}
            />
          </GridContainer>
        </CardBody>

        <CardFooter>
          <Button color="primary">Cập nhật</Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

UserList.propTypes = {
  classes: PropTypes.object,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};
