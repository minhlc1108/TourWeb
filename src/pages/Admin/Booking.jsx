import { Card, Button, Space, Table, Select, Form, Input, Modal, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { fetchAllBooking, fetchAllTourSchedulesAPI, fetchAllCustomers, createBooking, updateBooking, CreateBookingDetail, fetchAllBookingDetailsByIdBook, deleteBooking } from "~/apis"; // Đảm bảo API fetchAllTourSchedulesAPI và fetchAllCustomers có sẵn
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { message, modal } from "~/components/EscapeAntd";
import dayjs from "dayjs";

function Booking() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTexts, setSearchTexts] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    count: 0,
  });
  const [sorter, setSorter] = useState({ field: "", order: "ascend" });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [itemSelected, setItemSelected] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [tours, setTours] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookingItem, setBookingItem] = useState([]);
  const [addDetailModalVisible, setAddDetailModalVisible] = useState(false);
  const [date, setDate] = useState(null)
  const [detailForm] = Form.useForm();
  const handleAddDetail = () => {
    detailForm.resetFields();
    setAddDetailModalVisible(true);
  };

  const handleDetailSubmit = async (values) => {

    const payload = { ...values, BookingId: bookingItem.id, CustomerId: bookingItem.customerId, status: 1 }
    await CreateBookingDetail(payload)
      .then(() => {
        const updatedBookingItem = {
          ...bookingItem,
          bookingDetails: [
            ...bookingItem.bookingDetails,
            { ...values, bookingId: bookingItem.id, id: new Date().getTime() },
          ],
        };

        setBookingItem(updatedBookingItem);
        message.success("Thêm thành công");
        setVisible(false);
      })
    setAddDetailModalVisible(false);
  };

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchTexts({
  //     ...searchTexts,
  //     [dataIndex]: selectedKeys[0],
  //   });
  // };

  const handleTableChange = (newPagination, filters, newSorter) => {
    setPagination(newPagination);
    setSorter({ field: newSorter.field, order: newSorter.order });
  };

  const handleViewDetails = (bookingItem) => {
    fetchAllBookingDetailsByIdBook(bookingItem.id).then((data) => {
      console.log(data)
    })
    setBookingItem(bookingItem)
    setDetailModalVisible(true);
  };

  useEffect(() => {
    setIsLoading(true);

    const params = {
      ...searchTexts,
      sortBy: sorter.field,
      isDecsending: sorter.order === "ascend" ? false : true,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    };

    fetchAllBooking(params)
      .then((data) => {
        console.log(data)
        setData(data.bookings.map((booking) => ({ key: booking.id, ...booking })));
        setIsLoading(false);
        setPagination({
          ...pagination,
          total: data.total,
        });
      })
      .catch(() => message.error("Lỗi khi gọi api"));

    fetchAllTourSchedulesAPI().then((tourData) => {
      setTours(tourData.tourSchedules);
    }).catch(() => message.error("Lỗi khi tải danh sách Tour"));

    fetchAllCustomers().then((customerData) => {
      setCustomers(customerData.customers);
    }).catch(() => message.error("Lỗi khi tải danh sách Khách hàng"));
  }, [searchTexts, sorter, pagination.current, pagination.pageSize]);

  const handleStatusChange = (value, record) => {
    updateBooking(record.id, { ...record, status: value })
      .then(() => {
        message.success("Cập nhật trạng thái thành công");
        const newData = [...data];
        const index = newData.findIndex((item) => item.id === record.id);
        if (index !== -1) {
          newData[index].status = value;
          setData(newData);
        }
      })
      .catch(() => message.error("Lỗi khi cập nhật trạng thái"));
  };

  const handleAddBooking = () => {
    setItemSelected(null);
    form.resetFields();
    setVisible(true);
  };

  const handleSubmit = async (values) => {
    const payload = { ...values, time: date }
    if (itemSelected) {
      await updateBooking(itemSelected.id, payload)
        .then(() => {
          message.success("Cập nhật booking thành công");
          setVisible(false);
        })
        .catch(() => message.error("Lỗi khi cập nhật booking"));
    } else {
      await createBooking(payload)
        .then(() => {
          message.success("Thêm booking thành công");
          setVisible(false);
        })
        .catch(() => message.error("Lỗi khi tạo booking"));
    }
    const params = {
      ...searchTexts,
      sortBy: sorter.field,
      isDecsending: sorter.order === "ascend" ? false : true,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    };

    fetchAllBooking(params)
      .then((data) => {
        setData(data.bookings.map((booking) => ({ key: booking.id, ...booking })));
        setIsLoading(false);
        setPagination({
          ...pagination,
          total: data.total,
        });
      })
      .catch(() => message.error("Lỗi khi gọi api"));

  };

  useEffect(() => {
    if (itemSelected) setDate(itemSelected.time);
  }, [itemSelected])

  const deleteItem = async (id) => {
    await modal.confirm({
      title: "Xóa danh mục",
      content: "Bạn có muốn xóa đặt chỗ này?",
      onOk: async () => {
        const result = await deleteBooking(id);
        if (result) {
          message.success("Xóa thành công!", 3);
          setData((prevData) => prevData.filter((r) => r.id !== id));
        }
      },
    });
  };
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Select.Option value={1}>Đã xác nhận</Select.Option>
          <Select.Option value={0}>Chưa xác nhận</Select.Option>
        </Select>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      sorter: true,
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: "Tên tour",
      key: "tourSchedule.name",
      render: (_, record) => record.tourSchedule?.name || "Không có dữ liệu",
    },
    {
      title: "Tên khách hàng",
      key: "customer.name",
      render: (_, record) => record.customer?.name || "Không có dữ liệu",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <Space size="small">
            <Button variant="outlined" icon={<EditOutlined />} onClick={() => {
              setItemSelected(record)
              form.setFieldsValue(record);
              setVisible(true);
            }}></Button>
            <Button   onClick={() => deleteItem(record.id)} color="danger" variant="outlined" icon={<DeleteOutlined />}></Button>
            <Button variant="outlined" icon={<SearchOutlined />} onClick={() => handleViewDetails(record)} >
              Chi tiết
            </Button>
          </Space >
        );
      },
    },
  ];

  return (
    <Card title="Đặt chỗ" padding="1.25rem 1.25rem 0">
      <Button
        color="primary"
        variant="solid"
        icon={<PlusOutlined />}
        iconPosition="start"
        onClick={handleAddBooking}
      >
        Thêm
      </Button>

      <Modal
        visible={visible}
        title={itemSelected ? "Sửa đặt chỗ" : "Thêm đặt chỗ"}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 7 }}>
          <Form.Item
            style={{ width: '100%' }}
            label="Tên tour"
            name="tourScheduleId"
            rules={[{ required: true, message: "Vui lòng chọn tour" }]}
          >
            <Select>
              {tours.map((tour) => (
                <Select.Option key={tour.id} value={tour.id}>
                  {tour.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: '100%' }}
            label="Tên khách hàng"
            name="customerId"
            rules={[{ required: true, message: "Vui lòng chọn khách hàng" }]}
          >
            <Select>
              {customers.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: '100%' }}
            label="Tổng giá"
            name="totalPrice"
            rules={[{ required: true, message: "Vui lòng nhập tổng giá" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: '100%' }}
            label="Số lượng người lớn"
            name="adultCount"
            rules={[{ required: true, message: "Vui lòng nhập số lượng người lớn" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: '100%' }}
            label="Số lượng trẻ em"
            name="childCount"
            rules={[{ required: true, message: "Vui lòng nhập số lượng trẻ em" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: '100%' }}
            label="Thời gian"
            rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
          >
            <DatePicker
              showTime
              onChange={(value, dateString) => {
                setDate(value);
              }}
              format="YYYY-MM-DD HH:mm:ss"
              value={date ? dayjs(date, "YYYY-MM-DD HH:mm:ss") : null}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={detailModalVisible}
        title="Chi tiết Đặt chỗ"
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        open={detailModalVisible}
        width={800}
      >
        <Button
          color="primary"
          variant="solid"
          icon={<PlusOutlined />}
          iconPosition="start"
          onClick={handleAddDetail}
          disabled={bookingItem.status === 1}
        >
          Thêm
        </Button>
        <Table
          columns={[
            { title: "Chi tiết", dataIndex: "detail", key: "detail" },
            { title: "Giá", dataIndex: "price", key: "price", render: (text) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(text) },
          ]}
          dataSource={bookingItem.bookingDetails}
          pagination={false}
          rowKey="bookingId"
        />
      </Modal>
      <Modal
        visible={addDetailModalVisible}
        title="Thêm Chi tiết Đặt chỗ"
        onCancel={() => setAddDetailModalVisible(false)}
        onOk={() => detailForm.submit()}
      >
        <Form form={detailForm} onFinish={handleDetailSubmit} labelCol={{ span: 6 }}>
          <Form.Item
            label="Chi tiết"
            name="detail"
            rules={[{ required: true, message: "Vui lòng nhập chi tiết" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
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
}

export default Booking;     