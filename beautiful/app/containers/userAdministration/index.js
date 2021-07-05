/* eslint-disable react/jsx-boolean-value */
import React from 'react';
// core components
import CustomTabs from 'components/CustomTabs';
import UserList from './UserList';
import Notifications from './Notifications';

export default function UserProfile() {
  return (
    <div>
      <CustomTabs
        headerColor="primary"
        tabs={[
          {
            tabName: 'Danh sách người dùng',
            tabContent: <UserList />,
          },
          {
            tabName: 'Gán người dùng vào đơn vị',
            tabContent: <Notifications />,
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
    </div>
  );
}
