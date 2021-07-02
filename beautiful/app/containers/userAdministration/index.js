/* eslint-disable react/jsx-boolean-value */
import React from 'react';
// @material-ui/core components
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
// import CustomInput from 'components/CustomInput';
// import CardAvatar from 'components/Card/CardAvatar';

import CustomTabs from 'components/CustomTabs';

// import avatar from 'assets/img/faces/marc.jpg';

import UserList from './UserList';

export default function UserProfile() {
  // Get the current location.

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: 'Danh sách người dùng',
                tabContent: <UserList />,
              },
              {
                tabName: 'Gán người dùng vào đơn vị',
                tabContent: 'Màn hình gán',
              },
              {
                tabName: 'Gán vai trò cho người dùng',
                tabContent: 'Màn hình gán',
              },
              {
                tabName: 'Gán chức năng cho người dùng',
                tabContent: 'Màn hình gán',
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
