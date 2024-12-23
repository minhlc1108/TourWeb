/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  createBrowserRouter,
  Link,
  useLocation,
} from "react-router-dom";
import LayourClient from "~/layouts/app/LayoutClient";
import { DashboardLayout, UserLayout } from "~/layouts/dashboard";
import Account from "~/pages/Admin/Account";
import Booking from "~/pages/Admin/Booking";
import Category from "~/pages/Admin/Category";
import CreateTour from "~/pages/Admin/CreateTour";
import Customer from "~/pages/Admin/Customer";
import EditTour from "~/pages/Admin/EditTour";
import Promotion from "~/pages/Admin/Promotion";
import Statistic from "~/pages/Admin/StatisticAdmin";
import Tour from "~/pages/Admin/Tour";
import ChangePassword from "~/pages/Client/ChangePassword";
import DetailsProfileUser from "~/pages/Client/DetailsProfileUser";
import Home from "~/pages/Client/Home";
import ListBooking from "~/pages/Client/ListBooking";
import OrderBooking from "~/pages/Client/OrderBooking";
import ProfileUser from "~/pages/Client/ProfileUser";
import TourClient from "~/pages/Client/TourClient";
import TourDetail from "~/pages/Client/TourDetail";
import NotFound from "~/pages/Error/NotFound";
import CreateAccount from "~/pages/Admin/CreateAccount";
import EditAccount from "~/pages/Admin/EditAccount";
import Login from "~/pages/Login/LoginComponent";
import Register from "~/pages/Login/RegisterComponent";
import ForgotPassword from "~/pages/Login/ForgotPasswordComponent";
import PaymentBooking from "~/pages/Client/PaymentBooking";
import Forbidden from "~/pages/Error/Forbidden";
import ProtectedRoute from "./ProtectedRoute";

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
    path: "admin/*",
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
        path: "booking",
        element: <Booking />,
      },
      {
        path: "customer",
        children: [
          { index: true, element: <Customer /> },
          { path: "create", element: <CreateAccount /> },
          { path: "edit/:id", element: <EditAccount /> },
        ],
      },
      {
        path: "account",
        children: [
          { index: true, element: <Account /> },
          { path: "create", element: <CreateAccount /> },
          { path: "edit/:id", element: <EditAccount /> },
        ],
      },
    ],
  },

  // Client route
  {
    path: "",
    element: (
      <PageWrapper>
        <UserLayout />
      </PageWrapper>
    ),
    children: [
      {
        index: true,
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "tourClient",
        element: <TourClient />,
      },
      {
        path: "tour/:id",
        element: <TourDetail />,
      },
      {
        path: "order-booking/:id",
        element: <OrderBooking />,
      },
      {
        path: "payment-booking/:id",
        element: <PaymentBooking />,
      },
      {
        path: "login",
        element: (
          <>
            <div
              style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <h1>Đăng nhập</h1>
              <Login />
              <Link to="/register">Chưa có tài khoản? Đăng ký ngay!</Link>
            </div>
          </>
        ),
      },
      {
        path: "register",
        element: (
          <>
            <div
              style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <h1>Đăng ký</h1>
              <Register
                onRegisterSuccess={() => {
                  return true;
                }}
              />
              <Link to="/login">Đã có tài khoản? Đăng nhập!</Link>
            </div>
          </>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <>
            <div
              style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <h1>Quên mật khẩu</h1>
              <ForgotPassword />,
            </div>
          </>
        ),
      },
    ],
  },
  {
    path: "User",
    element: (
      <PageWrapper>
        <LayourClient>
          <ProfileUser />,
        </LayourClient>
      </PageWrapper>
    ),
    children: [
      {
        index: true,
        path: "ThongTinCaNhan",
        element: <DetailsProfileUser />,
      },
      {
        path: "DoiMatKhau",
        element: <ChangePassword />,
      },
      {
        path: "DanhSachTour",
        element: <ListBooking />,
      },
    ],
  },
  {
    path: "403",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
