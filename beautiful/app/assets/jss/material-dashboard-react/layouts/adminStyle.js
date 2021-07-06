import {
  drawerWidth,
  transition,
  container,
} from 'assets/jss/material-dashboard-react';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '60px',
    padding: '10px 15px 0',
    minHeight: 'calc(100vh - 300px)',
  },
  container,
  map: {
    marginTop: '60px',
  },
});

export default appStyle;
