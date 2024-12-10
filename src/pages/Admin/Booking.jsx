import {
  Card,
  Button,
  Space,
  Table,
  Select,
  Form,
  Input,
  Modal,
  DatePicker,
  InputNumber,
  Tag,
  Flex,
  Row,
  Col,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  fetchAllBooking,
  fetchAllTourAPI,
  getPromotionByCodeAPI,
  createBookingAPI,
  fetchPaymentBookingAPI,
  updateBookingStatusAPI,
  deleteBookingAPI,
} from "~/apis"; // Đảm bảo API fetchAllTourSchedulesAPI và fetchAllCustomers có sẵn
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message, modal } from "~/components/EscapeAntd";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { formatCurrencyVND } from "~/utils/format";
const { RangePicker } = DatePicker;

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
  const [tourSchedule, setTourSchedule] = useState(null);
  let oldPrice = useRef(0);
  let sumPrice = useRef(0);
  const [values, setValues] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [code, setCode] = useState("");
  const [isApply, setIsApply] = useState(false);
  let discount = useRef(null);
  const handleConfirmParticipants = async (values) => {
    form.submit();
    const quantityAdult = form.getFieldValue("adultCount");
    const quantityChild = form.getFieldValue("childCount");
    if (quantityAdult + quantityChild > tourSchedule?.remain) {
      message.error(
        `Rất tiếc Tour hiện tại số chỗ còn nhận chỉ còn: ${tourSchedule.remain} chỗ`
      );
      return;
    }
    sumPrice.current =
      itemSelected != null
        ? itemSelected.totalPrice
        : quantityAdult * tourSchedule.priceAdult +
          quantityChild * tourSchedule.priceChild;

    const totalParticipants = quantityAdult + quantityChild;

    let newParticipants = [];

    if (itemSelected?.bookingDetails.length > 0) {
      oldPrice.current = itemSelected.totalPrice + itemSelected.priceDiscount;
      // Tạo danh sách participants từ bookingDetails
      newParticipants = itemSelected?.bookingDetails.map((item, index) =>
        index < quantityAdult
          ? {
              key: index + 1,
              customerId: item.id,
              name: item.name,
              person: "Người lớn",
              price: item.price || 0,
              sex: item.sex == 1 ? "Nam" : "Nữ",
              birthday: item.birthday,
            }
          : {
              key: index + 1,
              customerId: item.id,
              name: item.name,
              price: tour?.priceChild || 0,
              person: "Trẻ em",
              sex: item.sex == 1 ? "Nam" : "Nữ",
              birthday: item.birthday,
            }
      );

      //   // Điều chỉnh số lượng participants cho khớp với totalParticipants
      // if (newParticipants.length < totalParticipants) {
      //   // Trừ đi participant đầu tiên
      //   const additionalParticipants = Array.from(
      //     { length: totalParticipants - 1 - newParticipants.length },
      //     (_, index) => ({
      //       key: newParticipants.length + index + 1,
      //       name: "",
      //       price:
      //         index < quantityAdult - 1 - newParticipants.length
      //           ? tour?.priceAdult || 0
      //           : tour?.priceChild || 0,
      //       person:
      //         index < quantityAdult - 1 - newParticipants.length
      //           ? "Người lớn"
      //           : "Trẻ em",
      //       email: "",
      //       phoneNumber: "",
      //       sex: null,
      //       address: "",
      //       birthday: null,
      //     })
      //   );
      //   newParticipants = [...newParticipants, ...additionalParticipants];
      // } else if (newParticipants.length > totalParticipants - 1) {
      //   newParticipants = newParticipants.slice(0, totalParticipants - 1);
      // }
    } else {
      // Tạo danh sách participants mặc định
      newParticipants = Array.from({ length: totalParticipants }, (_, index) =>
        index < quantityAdult
          ? {
              key: index + 1,
              name: "",
              person: "Người lớn",
              price: tourSchedule?.priceAdult || 0,
              sex: null,
              birthday: null,
            }
          : {
              key: index + 1,
              name: "",
              price: tourSchedule?.priceChild || 0,
              person: "Trẻ em",
              sex: null,
              birthday: null,
            }
      );
    }

    // Thêm participant đầu tiên vào danh sách
    setParticipants([...newParticipants]);
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
        setData(
          data.bookings.map((booking) => ({ key: booking.id, ...booking }))
        );
        setIsLoading(false);
        setPagination({
          ...pagination,
          total: data.total,
        });
      })
      .catch(() => message.error("Lỗi khi gọi api"));

    fetchAllTourAPI()
      .then((tourData) => {
        setTours(tourData.tours);
      })
      .catch(() => message.error("Lỗi khi tải danh sách Tour"));
  }, [searchTexts, sorter, pagination.current, pagination.pageSize]);

  // const handleStatusChange = (value, record) => {
  //   updateStatusBooking(record.id, { status: value })
  //     .then(() => {
  //       message.success("Cập nhật trạng thái thành công");
  //       const newData = [...data];
  //       const index = newData.findIndex((item) => item.id === record.id);
  //       if (index !== -1) {
  //         newData[index].status = value;
  //         setData(newData);
  //       }
  //     })
  //     .catch(() => message.error("Lỗi khi cập nhật trạng thái"));
  // };

  const handleAddBooking = () => {
    setItemSelected(null);
    form.resetFields();
    setVisible(true);
  };

  const handleSubmit = (values) => {
    setValues(values);
  };

  // useEffect(() => {
  //   if (itemSelected) setDate(itemSelected.time);
  // }, [itemSelected]);

  const deleteItem = async (id) => {
    await modal.confirm({
      title: "Xóa booking",
      content: "Bạn có muốn xóa đặt chỗ này?",
      onOk: async () => {
        await deleteBookingAPI(id);
        message.success("Xóa booking thành công!");
        setData((prevData) => prevData.filter((r) => r.id !== id));
      },
    });
  };
  const handleSelected = (value) => {
    const tour = tours.find((tour) => tour.id === value);
    form.resetFields(["departureDate"]);
    setTour(tour);
    setTourSchedule(null);
    if (tour.tourSchedules.length === 0) {
      message.error("Không có lịch trình cho tour này");
    }
    // if (tour) {
    //   const dateFormat = dayjs(tour?.departure, "YYYY-MM-DD HH:mm:ss")
    //   setDate(dateFormat)
    // }
    // form.setFieldsValue({ tourScheduleId: value });
  };
  // useEffect(() => {
  //   const tourSchedule = tour;
  //   const priceAdult = (tourSchedule?.priceAdult || 0) * (quantityAdult || 0);
  //   const priceChild = (tourSchedule?.priceChild || 0) * (quantityChild || 0);
  //   setSumPrice(priceAdult + priceChild);
  // }, [tour, quantityAdult, quantityChild]);

  // useEffect(() => {
  //   form.setFieldsValue({ totalPrice: sumPrice });
  // }, [sumPrice, form]);

  const handleCreateBooking = async () => {
    // const updatedParticipants = participants.slice(1);
    if (itemSelected) {
      setIsApply(null);
      setItemSelected(null);
      setVisible(false);
      setParticipants([]);
      return;
    }
    const payload = {
      ...values,
      customers: participants,
      tourScheduleId: tourSchedule.id,
      totalPrice: sumPrice.current,
      priceDiscount: discount.current ? oldPrice.current - sumPrice.current : 0,
      promotionId: discount.current ? discount.current.id : null,
      paymentMethod: "cash",
    };

    await createBookingAPI(payload)
      .then(() => {
        message.success("Thêm booking thành công");
        setVisible(false);
      })
      .catch(() => message.error("Lỗi khi tạo booking"));

    // }
    // const params = {
    //   ...searchTexts,
    //   sortBy: sorter.field,
    //   isDecsending: sorter.order === "ascend" ? false : true,
    //   pageNumber: pagination.current,
    //   pageSize: pagination.pageSize,
    // };
    // fetchAllBooking(params)
    //   .then((data) => {
    //     setData(
    //       data.bookings.map((booking) => ({ key: booking.id, ...booking }))
    //     );
    //     setIsLoading(false);
    //     setPagination({
    //       ...pagination,
    //       total: data.total,
    //     });
    //   })
    //   .catch(() => message.error("Lỗi khi gọi api"));
  };
  const columnParticipants = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (_, record, index) => (
        <Input
          readOnly={itemSelected != null}
          placeholder="Nhập tên"
          value={participants[index]?.name}
          onChange={(e) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].name = e.target.value;
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
          value={
            `${participants[index]?.price}`.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ) + "VNĐ"
          }
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
          disabled={itemSelected != null}
          value={participants[index]?.sex}
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
      title: "Ngày sinh",
      dataIndex: "birthday",
      render: (_, record, index) => (
        <DatePicker
          disabled={itemSelected != null}
          format="YYYY-MM-DD"
          value={
            participants[index]?.birthday
              ? dayjs(participants[index].birthday)
              : null
          }
          onChange={(date) => {
            const updatedParticipants = [...participants];
            updatedParticipants[index].birthday = date
              ? date.format("YYYY-MM-DD")
              : null;
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
          <Space size="small">
            {record.status === 2 && (
              <Button
                onClick={() => deleteItem(record.id)}
                color="danger"
                variant="outlined"
                icon={<DeleteOutlined />}
              ></Button>
            )}

            {record.status === 0 && (
              <Button
                onClick={async () => {
                  await modal.confirm({
                    title: "Xác nhận booking",
                    content: "Bạn có muốn xác nhận booking này?",
                    onOk: async () => {
                      await updateBookingStatusAPI({
                        id: record.id,
                        status: 1,
                      });
                      message.success("Thanh toán thành công!");
                      setData((prevData) =>
                        prevData.map((item) =>
                          item?.id === record?.id
                            ? {
                                ...item,
                                status: 1,
                              }
                            : item
                        )
                      );
                    },
                  });
                }}
              >
                Xác nhận
              </Button>
            )}

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
            <Button
              variant="outlined"
              icon={<InfoCircleOutlined />}
              onClick={() => {
                setItemSelected(record);
                fetchPaymentBookingAPI(record.id).then((data) => {
                  setItemSelected(data);
                  setIsApply(data.priceDiscount != 0 ? true : false);
                  form.setFieldsValue({
                    ...values,
                    departureDate: moment(record.tourSchedule?.departureDate),
                    name: data.customer?.name,
                    email: data.customer?.email,
                    phone: data.customer?.phoneNumber,
                    address: data.customer?.address,
                    adultCount: data.adultCount,
                    childCount: data.childCount,
                    tourId: record.tourSchedule?.tourId,
                  });
                  setVisible(true);
                });
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];

  // useEffect(() => {
  // if (itemSelected) {
  //   form.setFieldsValue({
  //     tourScheduleId: itemSelected.tourScheduleId,
  //     name: itemSelected.customer?.name,
  //     email: itemSelected.customer?.email,
  //     phoneNumber: itemSelected.customer?.phoneNumber,
  //     sex: itemSelected.customer?.sex,
  //     address: itemSelected.customer?.address,
  //     birthday: itemSelected.customer?.birthday
  //       ? dayjs(itemSelected.customer?.birthday)
  //       : null,
  //     adultCount: itemSelected.adultCount,
  //     childCount: itemSelected.childCount,
  //     discount: itemSelected.discount || "",
  //     totalPrice: itemSelected.totalPrice,
  //   });
  // setTour(tours.find((item) => item.id === itemSelected.tourScheduleId));
  // setQuantityAdult(itemSelected.adultCount);
  // setQuantityChild(itemSelected.childCount);
  // } else {
  //   form.resetFields();
  // }
  // }, [itemSelected, form]);

  return (
    <Card title="Đặt chỗ" padding="1.25rem 1.25rem 0">
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col sm={12} md={4}>
          <Button
            color="primary"
            variant="solid"
            icon={<PlusOutlined />}
            iconPosition="start"
            onClick={handleAddBooking}
          >
            Thêm
          </Button>
        </Col>
        <Col sm={12} md={6}>
          <Space>
            Trạng thái:
            <Select
              defaultValue={""}
              onChange={(value) =>
                setSearchTexts({ ...searchTexts, status: value })
              }
            >
              <Select.Option value={""}>Tất cả</Select.Option>
              <Select.Option value={0}>Chưa thanh toán</Select.Option>
              <Select.Option value={1}>Đã thanh toán</Select.Option>
              <Select.Option value={2}>Đã bị hủy</Select.Option>
            </Select>
          </Space>
        </Col>
        <Col sm={24} md={14}>
          <Space>
            Ngày đặt:
            <RangePicker
              onChange={(range) => {
                if (range) {
                  setSearchTexts({
                    ...searchTexts,
                    fromDate: range[0] ? range[0].format("YYYY-MM-DD") : null,
                    toDate: range[1] ? range[1].format("YYYY-MM-DD") : null,
                  });
                }
              }}
            />
          </Space>
        </Col>
      </Row>
      <Modal
        open={visible}
        title={itemSelected ? "Thông tin đặt chỗ" : "Thêm đặt chỗ"}
        onCancel={() => {
          setVisible(false);
          setItemSelected(null);
          setParticipants([]);
          setIsApply(false);
        }}
        footer={null}
        width={1200}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 10 }}
          className="grid grid-cols-2 gap-5"
        >
          {participants.length === 0 && (
            <>
              <Form.Item
                style={{ width: "100%" }}
                label="Tên tour"
                name="tourId"
                rules={[{ required: true, message: "Vui lòng chọn tour" }]}
              >
                <Select
                  onChange={handleSelected}
                  disabled={itemSelected != null}
                >
                  {tours?.map((tour) => (
                    <Select.Option key={tour.id} value={tour.id}>
                      {tour.id} - {tour.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="Ngày khởi hành"
                name="departureDate"
                rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
              >
                <DatePicker
                  disabled={itemSelected != null}
                  onChange={(value, dateString) => {
                    const selectedTourSchedule = tour.tourSchedules?.find(
                      (ts) =>
                        moment(ts.departureDate).format("YYYY-MM-DD") ===
                        value.format("YYYY-MM-DD")
                    );
                    setTourSchedule(selectedTourSchedule);
                  }}
                  disabledDate={(current) =>
                    current &&
                    (current < moment().startOf("day") ||
                      !tour?.tourSchedules?.some(
                        (ts) =>
                          moment(ts?.departureDate).format("YYYY-MM-DD") ===
                          current.format("YYYY-MM-DD")
                      ))
                  }
                />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="Tên người đặt"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khách hàng" },
                ]}
              >
                <Input placeholder="Họ tên" disabled={itemSelected != null} />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập Email" },
                  {
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
              >
                <Input placeholder="email" disabled={itemSelected != null} />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  {
                    pattern: "^0[0-9]{9}$",
                    message: "Số điện thoại không đúng định dạng!",
                  },
                ]}
              >
                <Input
                  placeholder="số điện thoại"
                  disabled={itemSelected != null}
                />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="Địa chỉ"
                name="address"
              >
                <Input placeholder="Địa chỉ" disabled={itemSelected != null} />
              </Form.Item>

              <Form.Item
                style={{ width: "100%" }}
                label="Số lượng người lớn"
                name="adultCount"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng người lớn",
                  },
                ]}
              >
                <InputNumber min={1} disabled={itemSelected != null} />
              </Form.Item>

              <Form.Item
                style={{ width: "100%" }}
                label="Số lượng trẻ em"
                name="childCount"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng trẻ em" },
                ]}
              >
                <InputNumber min={0} disabled={itemSelected != null} />
              </Form.Item>

              {/* <Form.Item
                style={{ width: "100%" }}
                label="Tổng giá"
                name="totalPrice"
                rules={[{ required: true, message: "Vui lòng nhập tổng giá" }]}
              >
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "VNĐ"
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  className="w-[200px]"
                  readOnly
                />
              </Form.Item> */}

              <div style={{ gridColumn: "span 2", textAlign: "right" }}>
                <Button type="primary" onClick={handleConfirmParticipants}>
                  Xác nhận
                </Button>
              </div>
            </>
          )}
        </Form>
        {participants.length > 0 && (
          <>
            <div style={{ gridColumn: "span 2", textAlign: "left" }}>
              <Button
                type="outline"
                typeof="button"
                onClick={() => setParticipants([])}
              >
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
            <div
              style={{ gridColumn: "span 2", textAlign: "right" }}
              className="mt-[30px]"
            >
              {itemSelected == null && (
                <Row justify="space-between">
                  <Col span={18}>
                    <Flex gap={4}>
                      <Input
                        disabled={isApply}
                        placeholder="Mã giảm giá"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      {isApply && (
                        <Button
                          onClick={() => {
                            setIsApply(false);
                            discount.current = 0;
                            sumPrice.current = oldPrice.current;
                            oldPrice.current = 0;
                          }}
                        >
                          Hủy
                        </Button>
                      )}
                    </Flex>
                  </Col>
                  <Col>
                    <Button
                      disabled={isApply}
                      onClick={() => {
                        if (code === "") {
                          message.error("Vui lòng nhập mã giảm giá");
                          return;
                        }
                        getPromotionByCodeAPI(code).then((data) => {
                          discount.current = data;
                          oldPrice.current = sumPrice.current;
                          sumPrice.current =
                            sumPrice.current -
                            (data.percentage / 100) * sumPrice.current;
                          setIsApply(true);
                        });
                      }}
                    >
                      Áp dụng
                    </Button>
                  </Col>
                </Row>
              )}
              <div style={{ marginBottom: 10 }}>
                Tổng tiền{" "}
                {isApply && (
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "16px",
                      textDecoration: "line-through",
                      color: "#ccc",
                    }}
                  >
                    {formatCurrencyVND(oldPrice.current)}
                  </span>
                )}
                <span style={{ color: "red", fontSize: 16 }}>
                  {formatCurrencyVND(sumPrice.current)}
                </span>{" "}
              </div>
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
