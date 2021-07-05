/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';

import routes from 'containers/Admin/routes';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acc1',
    },
  },
});

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState('blue');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => window.location.pathname !== '/admin/maps';
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText="Lifetek"
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {getRoute() ? <Footer /> : null}
        </div>
      </div>
    </ThemeProvider>
  );
}
