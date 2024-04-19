import React from 'react';
import BottomNavbarSidebar from './tenantbar'; // Adjust the path accordingly

// eslint-disable-next-line react/prop-types
const TenantLayout = ({ children }) => {
  return (
    <BottomNavbarSidebar>
      <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
    </BottomNavbarSidebar>
  );
}

export default TenantLayout;