/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import LayourClient from "~/layouts/app/LayoutClient";
import { DashboardLayout, UserLayout } from "~/layouts/dashboard";
import Booking from "~/pages/Admin/Booking";
import Category from "~/pages/Admin/Category";
import CreateTour from "~/pages/Admin/CreateTour";
import Customer from "~/pages/Admin/Customer";
import EditTour from "~/pages/Admin/EditTour";
import Promotion from "~/pages/Admin/Promotion";
import Statistic from "~/pages/Admin/StatisticAdmin";
import Tour from "~/pages/Admin/Tour";
import Transport from "~/pages/Admin/Transport";
import ChangePassword from "~/pages/Client/ChangePassword";
import DetailsProfileUser from "~/pages/Client/DetailsProfileUser";
import Home from "~/pages/Client/Home";
import ListBooking from "~/pages/Client/ListBooking";
import ProfileUser from "~/pages/Client/ProfileUser";
import TourClient from "~/pages/Client/TourClient";
import TourDetailsClient from "~/pages/Client/TourDetailsClient";

import NotFound from "~/pages/Error/NotFound";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PageWrapper = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

const routes = createBrowserRouter([
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <PageWrapper>
          <DashboardLayout />
        </PageWrapper>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "",
        element: <Statistic />,
      },
      {
        path: "statistic",
        element: <Statistic />,
      },
      {
        path: "tour",
        element: <Tour />,
        children: [
          {
            path: "create",
            element: <CreateTour />,
          },
          {
            path: "edit",
            element: <EditTour />,
          },
        ],
      },
      {
        path: "promotion",
        element: <Promotion />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "transport",
        element: <Transport />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      
      
    ],
  },
  {
    path: "",
    element: (
    <ProtectedRoute>
      <PageWrapper>
        <UserLayout/>
      </PageWrapper>
    </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "",
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "tourClient",
        element: <TourClient/>
      },
      {
        path: "tourDetailsClient",
        element: <TourDetailsClient/>
      },
     
      
    ]
  },
  {
    path: "User",
    element:(
    <ProtectedRoute>
      <PageWrapper>
          <LayourClient>
            <ProfileUser/>,
          </LayourClient>
      </PageWrapper>
    </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "ThongTinCaNhan",
        element: <DetailsProfileUser />,
      },
      {
        path: "DoiMatKhau",
        element: <ChangePassword/>
      },
      {
        path: "DanhSachTour",
        element: <ListBooking/>
      },
    ],
  },
 
]);

export default routes;
