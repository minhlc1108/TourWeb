import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Pagination,
  Flex,
  Table,
  Tag,
  Space,
  message,
} from "antd";
import { Button, Result } from "antd";
import InforCardHorizone from "~/layouts/app/InforCardHorizone";
import {
  getCustomerByIdAPI,
  updateCustomerAPI,
  getAccountByIdAPI,
  getCustomerByEmailAPI,
  updateBookingStatusAPI,
} from "~/apis";
import { Link, useNavigate } from "react-router-dom";
import { use } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { modal } from "~/components/EscapeAntd";

const ListBooking = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    count: 0,
  });
  const user = useSelector((state) => state.auth.user);
  const [sorter, setSorter] = useState({ field: "", order: "ascend" });
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getCustomerByEmailAPI(user.email)
        .then((data) => {
          setData(data?.bookings.map((item) => ({ ...item, key: item.id })));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "ID Người đặt",
      dataIndex: "customerId",
      key: "customerId",
      sorter: true,
    },
    {
      title: "Số lượng người lớn",
      dataIndex: "adultCount",
      key: "adultCount",
      sorter: true,
    },
    {
      title: "Số lượng trẻ em",
      dataIndex: "childCount",
      key: "childCount",
      sorter: true,
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: true,
      render: (text) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(text),
    },
    {
      title: "Giá giảm",
      dataIndex: "priceDiscount",
      key: "priceDiscount",
      sorter: true,
      render: (text) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(text),
    },
    {
      title: "Mã khuyến mãi",
      dataIndex: "promotionId",
      key: "promotionId",
      render: (promotionId) => (promotionId ? promotionId : "Không áp dụng"),
    },
    {
      title: "Thời gian đặt",
      dataIndex: "time",
      key: "time",
      sorter: true,
      render: (time) => new Date(time)?.toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        switch (status) {
          case 0:
            return <Tag color="gold">Chưa thanh toán</Tag>;
          case 1:
            return <Tag color="green">Đã thanh toán</Tag>;
          case 2:
            return <Tag color="red">Đã bị hủy</Tag>;
        }
      },
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <Space>
            {record.status !== 2 &&
              moment(record.tourSchedule?.departureDate).isAfter(
                moment.now()
              ) && (
                <Button
                  onClick={async () => {
                    await modal.confirm({
                      title: "Hủy booking",
                      content: "Bạn có muốn hủy booking này?",
                      onOk: async () => {
                        await updateBookingStatusAPI({
                          id: record.id,
                          status: 2,
                        });
                        message.success("Hủy booking thành công!");
                        setData((prevData) =>
                          prevData.map((item) =>
                            item?.id === record?.id
                              ? {
                                  ...item,
                                  status: 2,
                                }
                              : item
                          )
                        );
                      },
                    });
                  }}
                >
                  Hủy
                </Button>
              )}
            <Button>
              <Link to={`/payment-booking/${record.id}`}>Xem chi tiết</Link>
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleTableChange = (newPagination, filters, newSorter) => {
    setPagination(newPagination);
    setSorter({ field: newSorter.field, order: newSorter.order });
  };

  return (
    <Card
      title="Tất cả"
      style={{
        height: "100vh",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default ListBooking;
