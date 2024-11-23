import { AppLayout } from '../app';
import { Outlet } from 'react-router-dom';
import LayoutClient from '../app/LayoutClient';

export const DashboardLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const UserLayout = () => {
  return(
    <LayoutClient>
      <Outlet/>
    </LayoutClient>
  );
};
