import { Card, Button, Space, Table, Select, Form, Input, Modal, DatePicker, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { fetchAllBooking, updateBooking, deleteBooking, createAdminBooking, fetchAllTourSchedulesAPI, updateAdminBooking, updateStatusBooking } from "~/apis"; // Đảm bảo API fetchAllTourSchedulesAPI và fetchAllCustomers có sẵn
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { message, modal } from "~/components/EscapeAntd";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";

function Booking() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTexts, setSearchTexts] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    count: 0,
  });
  const [tour, setTour] = useState(null);
  const [sorter, setSorter] = useState({ field: "", order: "ascend" });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [itemSelected, setItemSelected] = useState(null);
  const [tours, setTours] = useState([]);
  const [quantityChild, setQuantityChild] = useState(0)
  const [quantityAdult, setQuantityAdult] = useState(0)
  const [sumPrice, setSumPrice] = useState(0)
  const [date, setDate] = useState(null)
  const [values, setValues] = useState(null)
  const [participants, setParticipants] = useState([]);
  const handleConfirmParticipants = async () => {
    form.submit();
    const totalParticipants = quantityAdult + quantityChild; // Tổng số người tham gia, bao gồm người đầu tiên
    const participant = {
      key: 0,
      name: form.getFieldValue('name'),
      price: tour?.priceAdult || 0,
      person: "Người lớn",
      email: form.getFieldValue('email'),
      phoneNumber: form.getFieldValue('phoneNumber'),
      sex: form.getFieldValue('sex'),
      address: form.getFieldValue('address'),
      birthday: form.getFieldValue('birthday'),
    };

    let newParticipants = [];
    console.log(itemSelected?.bookingDetails);

    if (itemSelected?.bookingDetails.length > 0) {
      // Tạo danh sách participants từ bookingDetails
      newParticipants = itemSelected?.bookingDetails.map((item, index) => (
        index < quantityAdult - 1 ? {
          key: index + 1,
          customerId: item.customerId,
          name: item.customer.name,
          person: "Người lớn",
          email: item.customer.email,
          phoneNumber: item.customer.phoneNumber,
          price: tour?.priceAdult || 0,
          sex: item.customer.sex,
          address: item.customer.address,
          birthday: item.customer.birthday,
        } : {
          key: index + 1,
          customerId: item.customerId,
          name: item.customer.name,
          price: tour?.priceChild || 0,
          person: "Trẻ em",
          email: item.customer.email,
          phoneNumber: item.customer.phoneNumber,
          sex: item.customer.sex,
          address: item.customer.address,
          birthday: item.customer.birthday,
        }
      ));

      // Điều chỉnh số lượng participants cho khớp với totalParticipants
      if (newParticipants.length < totalParticipants - 1) { // Trừ đi participant đầu tiên
        const additionalParticipants = Array.from(
          { length: totalParticipants - 1 - newParticipants.length },
          (_, index) => ({
            key: newParticipants.length + index + 1,
            name: "",
            price: index < quantityAdult - 1 - newParticipants.length ? tour?.priceAdult || 0 : tour?.priceChild || 0,
            person: index < quantityAdult - 1 - newParticipants.length ? "Người lớn" : "Trẻ em",
            email: '',
            phoneNumber: '',
            sex: null,
            address: "",
            birthday: null,
          })
        );
        newParticipants = [...newParticipants, ...additionalParticipants];
      } else if (newParticipants.length > totalParticipants - 1) {
        newParticipants = newParticipants.slice(0, totalParticipants - 1);
      }
    } else {
      // Tạo danh sách participants mặc định
      newParticipants = Array.from({ length: totalParticipants - 1 }, (_, index) => (
        index < quantityAdult - 1 ? {
          key: index + 1,
          name: "",
          person: "Người lớn",
          email: '',
          phoneNumber: '',
          price: tour?.priceAdult || 0,
          sex: null,
          address: "",
          birthday: null,
        } : {
          key: index + 1,
          name: "",
          price: tour?.priceChild || 0,
          person: "Trẻ em",
          email: '',
          phoneNumber: '',
          sex: null,
          address: "",
          birthday: null,
        }
      ));
    }

    // Thêm participant đầu tiên vào danh sách
    setParticipants([participant, ...newParticipants]);
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

  }, [searchTexts, sorter, pagination.current, pagination.pageSize]);

  const handleStatusChange = (value, record) => {
    updateStatusBooking(record.id, { status: value })
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
    const payload = { ...values }
    setValues(payload);

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
  const handleSelected = (value) => {
    const tour = tours.find(tour => tour.id === value);
    setTour(tour);
    // if (tour) {
    //   const dateFormat = dayjs(tour?.departure, "YYYY-MM-DD HH:mm:ss")
    //   setDate(dateFormat)
    // }
    // form.setFieldsValue({ tourScheduleId: value });
  }
  useEffect(() => {
    const tourSchedule = tour;
    const priceAdult = (tourSchedule?.priceAdult || 0) * (quantityAdult || 0);
    const priceChild = (tourSchedule?.priceChild || 0) * (quantityChild || 0);
    setSumPrice(priceAdult + priceChild);
  }, [tour, quantityAdult, quantityChild]);

  useEffect(() => {
    form.setFieldsValue({ totalPrice: sumPrice });
  }, [sumPrice, form]);

  const handleCreateBooking = async () => {
    const updatedParticipants = participants.slice(1);
    const payload = { ...values, participants: updatedParticipants };

    if (itemSelected) {
      const values = { ...payload, customerId: itemSelected.customerId }
      await updateAdminBooking(itemSelected.id, values)
        .then(() => {
          message.success("Cập nhật booking thành công");
          setVisible(false);
        })
        .catch(() => message.error("Lỗi khi cập nhật booking"));
    } else {
      await createAdminBooking(payload)
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
  }
  const columnParticipants = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (_, record, index) => (
        <Input
          placeholder="Nhập tên"
          value={participants[index]?.name}
          disabled={index === 0}
          onChange={(e) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].name = e.target.value;
            setParticipants(updatedParticipants);
          }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record, index) => (
        <Input
          placeholder="Nhập email"
          value={participants[index]?.email}
          disabled={index === 0}
          onChange={(e) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].email = e.target.value;
            setParticipants(updatedParticipants);
          }}
        />
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      render: (_, record, index) => (
        <Input
          value={participants[index]?.phoneNumber}
          disabled={index === 0}
          onChange={(e) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].phoneNumber = e.target.value;
            setParticipants(updatedParticipants);
          }}
        />
      ),
    },
    {
      title: "Người",
      dataIndex: "person",
      render: (_, record, index) => (
        <Input
          placeholder="Nhập tên"
          value={participants[index]?.person}
          readOnly={true}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (_, record, index) => (
        <Input
          value={`${participants[index]?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'VNĐ'}
          readOnly={true}
        />
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      render: (_, record, index) => (
        <Select
          placeholder="giới tính"
          value={participants[index]?.sex}
          disabled={index === 0}
          onChange={(value) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].sex = value;
            setParticipants(updatedParticipants);
          }}
        >
          <Select.Option value={1}>Nam</Select.Option>
          <Select.Option value={2}>Nữ</Select.Option>
        </Select>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (_, record, index) => (
        <Input
          placeholder="Nhập địa chỉ"
          disabled={index === 0}
          value={participants[index]?.address}
          onChange={(e) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].address = e.target.value;
            setParticipants(updatedParticipants);
          }}
        />
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      render: (_, record, index) => (
        <DatePicker
          format="YYYY-MM-DD"
          value={participants[index]?.birthday ? dayjs(participants[index].birthday) : null}
          disabled={index === 0}
          onChange={(date) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].birthday = date ? date.format("YYYY-MM-DD") : null;
            setParticipants(updatedParticipants);
          }}
        />
      ),
    },
  ];

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
      title: "Thời gian khởi hành",
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
              const { time, ...values } = record;
              form.setFieldsValue({ ...values, time: dayjs(time, "YYYY-MM-DD HH:mm:ss") });
              setVisible(true);
            }}></Button>
            <Button onClick={() => deleteItem(record.id)} color="danger" variant="outlined" icon={<DeleteOutlined />}></Button>
          </Space >
        );
      },
    },
  ];

  useEffect(() => {
    if (itemSelected) {
      form.setFieldsValue({
        tourScheduleId: itemSelected.tourScheduleId,
        name: itemSelected.customer.name,
        email: itemSelected.customer.email,
        phoneNumber: itemSelected.customer.phoneNumber,
        sex: itemSelected.customer.sex,
        address: itemSelected.customer.address,
        birthday: itemSelected.customer.birthday
          ? dayjs(itemSelected.customer.birthday)
          : null,
        adultCount: itemSelected.adultCount,
        childCount: itemSelected.childCount,
        discount: itemSelected.discount || '',
        totalPrice: itemSelected.totalPrice,
      });
      setTour(tours.find(item => item.id === itemSelected.tourScheduleId))
      setQuantityAdult(itemSelected.adultCount)
      setQuantityChild(itemSelected.childCount)
    } else {
      form.resetFields();
    }
  }, [itemSelected, form]);

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
        footer={null}
        width={1200}
      >
        <Form form={form} onFinish={handleSubmit}
          labelCol={{ span: 10 }} className="grid grid-cols-2 gap-5">
          {
            participants.length === 0 &&
            <>
              <Form.Item
                style={{ width: '100%' }}
                label="Tên tour"
                name="tourScheduleId"
                rules={[{ required: true, message: "Vui lòng chọn tour" }]}
              >
                <Select onChange={handleSelected} >
                  {tours?.map((tour) => (
                    <Select.Option key={tour.id} value={tour?.id} >
                      {tour.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Thời gian khởi hành"
                name="time"
                rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              >
                <DatePicker
                  showTime
                  onChange={(value, dateString) => {
                    setDate(value);
                    // form.setFieldsValue({ time: value });
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                  value={date ? dayjs(date, "YYYY-MM-DD HH:mm:ss") : null}
                />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Tên khách hàng"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
              >
                <Input placeholder="Tên khách hàng"
                />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập Email" }]}
              >
                <Input placeholder="email" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input placeholder="số điện thoại" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Giới tính"
                name="sex"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value={1}>Nam</Select.Option>
                  <Select.Option value={2}>Nữ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>

              <Form.Item
                style={{ width: '100%' }}
                label="Ngày sinh"
                name="birthday"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>

              <Form.Item
                style={{ width: '100%' }}
                label="Số lượng người lớn"
                name="adultCount"
                rules={[{ required: true, message: "Vui lòng nhập số lượng người lớn" }]}
              >
                <InputNumber
                  min={0}
                  value={quantityAdult}
                  onChange={(value) => setQuantityAdult(value || 0)}
                />
              </Form.Item>

              <Form.Item
                style={{ width: '100%' }}
                label="Số lượng trẻ em"
                name="childCount"
                rules={[{ required: true, message: "Vui lòng nhập số lượng trẻ em" }]}
              >
                <InputNumber
                  min={0}
                  value={quantityChild}
                  onChange={(value) => setQuantityChild(value || 0)}
                />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Mã giảm giá"
                name="discount"
              // rules={[{ required: true, message: "Vui lòng nhập Mã giảm giá" }]}
              >
                <Input placeholder="Nhập Mã giảm giá" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                label="Tổng giá"
                name="totalPrice"
                rules={[{ required: true, message: "Vui lòng nhập tổng giá" }]}
              >
                <InputNumber
                  defaultValue={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'VNĐ'}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                  className="w-[200px]"
                  readOnly
                />
              </Form.Item>
              <div style={{ gridColumn: "span 2", textAlign: "right" }}>
                <Button type="primary" onClick={handleConfirmParticipants}>
                  Xác nhận
                </Button>
              </div>
            </>
          }
        </Form>
        {participants.length > 0 && (
          <>
            <div style={{ gridColumn: "span 2", textAlign: "left" }}>
              <Button type="outline" typeof="button" onClick={() => setParticipants([])}>
                <ArrowLeft />
              </Button>
            </div>
            <div style={{ gridColumn: "span 2", marginTop: "20px" }}>
              <Table
                columns={columnParticipants}
                dataSource={participants}
                pagination={false}
                bordered
              />
            </div>
            <div style={{ gridColumn: "span 2", textAlign: "right" }} className="mt-[30px]">
              <Button type="primary" onClick={handleCreateBooking}>
                Xác nhận
              </Button>
            </div>
          </>
        )}
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