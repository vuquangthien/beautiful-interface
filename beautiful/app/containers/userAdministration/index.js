/* eslint-disable react/jsx-boolean-value */
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Link, Switch, Route } from 'react-router-dom';
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
// import CustomInput from 'components/CustomInput';
import Button from 'components/CustomButtons';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
// import CardAvatar from 'components/Card/CardAvatar';
import CardBody from 'components/Card/CardBody';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CustomDivider from 'components/CustomDivider';

import Collapse from '@material-ui/core/Collapse';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

// import avatar from 'assets/img/faces/marc.jpg';

import UserList from './UserList';

const styles = {
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
  lowercase: {
    textTransform: 'none',
  },
  marginRight: {
    marginRight: 'auto',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  // Get the current location.
  const [open, setOpen] = React.useState(true);
  const routes = {
    LIST: '/admin/user/list',
    UNIT: '/admin/user/unit',
    ROLE: '/admin/user/role',
    FUNC: '/admin/user/func',
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <GridContainer reverse="true">
        <Switch>
          <Route exact path={routes.LIST}>
            <UserList
              classes={classes}
              rows={[
                {
                  name: 'Vũ Quang Thiện',
                  gender: 'Nam',
                  city: 'Hà Nội',
                  car: 'Honda',
                },
                {
                  name: 'Trần Thị Hồng Vân',
                  gender: 'Nữ',
                  city: 'Phú Thọ',
                  car: 'VinFast',
                },
              ]}
              columns={[
                { name: 'name', title: 'Name' },
                { name: 'gender', title: 'Gender' },
                { name: 'city', title: 'City' },
                { name: 'car', title: 'Car' },
              ]}
            />
          </Route>
        </Switch>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardHeader color="primary">
              <p className={classes.cardTitleWhite}>Danh mục</p>
            </CardHeader>
            <CardBody profile>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem onClick={handleClick}>
                  <Button color="primary">
                    <MenuOpenIcon />
                    Menu
                  </Button>
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem>
                      <Link to={routes.LIST}>
                        <Button size="sm" link color="primary">
                          Danh sách người dùng
                        </Button>
                      </Link>
                    </ListItem>
                    <CustomDivider />
                    <ListItem>
                      <Link to={routes.UNIT}>
                        <Button size="sm" link color="primary">
                          Gán người dùng vào đơn vị
                        </Button>
                      </Link>
                    </ListItem>
                    <CustomDivider />
                    <ListItem>
                      <Link to={routes.ROLE}>
                        <Button size="sm" color="primary" link>
                          Gán vai trò cho người dùng
                        </Button>
                      </Link>
                    </ListItem>
                    <CustomDivider />
                    <ListItem>
                      <Link to={routes.FUNC}>
                        <Button size="sm" color="primary" link>
                          Gán chức năng cho người dùng
                        </Button>
                      </Link>
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
