// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Notifications from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import userAdministration from '../userAdministration';
// import DashboardPage from 'views/Dashboard/Dashboard.js';
// core components/views for Admin layout
// import TableList from 'views/TableList/TableList.js';
// import Icons from 'views/Icons/Icons.js';
// import Maps from 'views/Maps/Maps.js';
// import NotificationsPage from 'views/Notifications/Notifications.js';
// import UpgradeToPro from 'views/UpgradeToPro/UpgradeToPro.js';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    // component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'Thông tin người dùng',
    icon: Person,
    component: userAdministration,
    layout: '/admin',
  },
  {
    path: '/categories',
    name: 'Danh mục',
    icon: CategoryIcon,
    // component: Typography,
    layout: '/admin',
  },
  // {
  //   path: '/category ',
  //   name: 'Danh mục',
  //   icon: CategoryIcon,
  //   // component: TableList,
  //   layout: '/admin',
  // },
  {
    path: '/app',
    name: 'Ứng dụng',
    icon: AppsIcon,
    // component: Typography,
    layout: '/admin',
  },
  {
    path: '/extension',
    name: 'Tiện ích',
    icon: BubbleChart,
    // component: Icons,
    layout: '/admin',
  },
  {
    path: '/Setting',
    name: 'Cài đặt',
    icon: SettingsIcon,
    // component: Maps,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Thông báo',
    icon: Notifications,
    // component: NotificationsPage,
    layout: '/admin',
  },
];

export default dashboardRoutes;
