/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppUpdateTab from './AppUpdateTab';

const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#00acc1',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#00acc1',
      opacity: 1,
    },
    '&$selected': {
      color: '#00acc1',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#00acc1',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    // padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  paper: {
    padding: 20,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Application() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="ant example"
        >
          <AntTab label="Cập nhật ứng dụng" {...a11yProps(0)} />
          <AntTab label="Quản lý cây đơn vị" {...a11yProps(1)} />
          <AntTab label="Quản lý chức năng" {...a11yProps(2)} />
          <AntTab label="Quản lý vai trò" {...a11yProps(3)} />
        </AntTabs>
        <Typography className={classes.padding} />
      </div>
      <TabPanel value={value} index={0}>
        <AppUpdateTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        2
      </TabPanel>
      <TabPanel value={value} index={2}>
        3
      </TabPanel>
      <TabPanel value={value} index={3}>
        4
      </TabPanel>
    </div>
  );
}
