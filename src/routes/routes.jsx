/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "~/layouts/dashboard";
import Booking from "~/pages/Admin/Booking";
import Category from "~/pages/Admin/Category";
import CreateTour from "~/pages/Admin/CreateTour";
import Customer from "~/pages/Admin/Customer";
import EditTour from "~/pages/Admin/EditTour";
import Promotion from "~/pages/Admin/Promotion";
import Statistic from "~/pages/Admin/Statistic";
import Tour from "~/pages/Admin/Tour";
import Transport from "~/pages/Admin/Transport";
import NotFound from "~/pages/Error/NotFound";
import Home from "~/pages/Client/Home";

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
      },
      {
        path: "tour/create",
        element: <CreateTour />,
      },
      {
        path: "tour/edit",
        element: <EditTour />,
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
   // Client route
   {
    path: "/client",
    element: <Home />  // Trang chủ cho client
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
