import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Space,
  Spin,
  Steps,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkBeforeCreatePaymentAPI,
  CreatePaymentVNPayAPI,
  fetchPaymentBookingAPI,
} from "~/apis";
import { formatCurrencyVND } from "~/utils/format";

const { Title } = Typography;
function PaymentBooking() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let { id } = useParams();
  let dataSource = useRef([]);

  useEffect(() => {
    if (id) {
      fetchPaymentBookingAPI(id)
        .then((data) => {
          setBooking(data);
          dataSource.current = data.bookingDetails.map((item) => ({
            key: item.id,
            name: item.name,
            birthday: moment(item.birthday, "YYYY-MM-DD").format("DD/MM/YYYY"),
            sex: item.sex == 1 ? "Nam" : "Nữ",
            price: formatCurrencyVND(item.price),
          }));
        })
        .catch((error) => {
          navigate("/404");
        });
    }
  }, []);

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
  ];

  const handlePayment = () => {
    if (booking.paymentMethod === "vnpay") {
      checkBeforeCreatePaymentAPI(booking.id).then(() => {
        setIsSubmitting(true);
        CreatePaymentVNPayAPI({
          orderId: booking.id,
          description: `Thanh toán cho hóa đơn ${booking.id}`,
          fullName: booking.customer?.name,
          amount: booking.totalPrice,
        })
          .then((data) => {
            console.log(data);
            window.location = data;
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      });
    }
  };

  return (
    <>
      {!booking ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate("/");
            }}
            style={{ marginBottom: 16 }}
          >
            Trở về trang chủ
          </Button>
          <Title
            level={2}
            style={{ textAlign: "center", color: "#0b5da7", fontWeight: 700 }}
          >
            ĐẶT TOUR
          </Title>
          <Steps
            labelPlacement="vertical"
            current={booking.status == 1 ? 3 : 2}
            items={[
              {
                title: "Nhập thông tin",
              },
              {
                title: "Thanh toán",
              },
              {
                title: "Hoàn tất",
              },
            ]}
            style={{ marginBottom: 32 }}
          />

          <Row gutter={20}>
            <Col md={14} sm={24}>
              <Card title="Thông tin liên lạc" style={{ marginBottom: 24 }}>
                <Row gutter={20}>
                  <Col xs={24} sm={12} lg={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Họ tên</h3>
                    <p
                      style={{
                        padding: "8px 0",
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {booking.customer?.name}
                    </p>
                  </Col>
                  <Col xs={24} sm={12} lg={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Email</h3>
                    <p
                      style={{
                        padding: "8px 0",
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {booking.customer?.email}
                    </p>
                  </Col>
                  <Col xs={24} sm={12} lg={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                      Số điện thoại
                    </h3>
                    <p
                      style={{
                        padding: "8px 0",
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {booking.customer?.phoneNumber}
                    </p>
                  </Col>
                  <Col xs={24} sm={12} lg={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Địa chỉ</h3>
                    <p
                      style={{
                        padding: "8px 0",
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {booking.customer?.address}
                    </p>
                  </Col>
                </Row>
              </Card>
              <Card title="Chi tiết booking" style={{ marginBottom: 24 }}>
                <Row gutter={40}>
                  <Col style={{ marginTop: 10 }} xs={24} sm={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                      Mã booking:
                    </h3>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={16}>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#e01600",
                        fontWeight: 500,
                      }}
                    >
                      {booking.id}
                    </p>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Ngày tạo:</h3>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={16}>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {moment(booking.time).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                      Hình thức thanh toán:
                    </h3>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={16}>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {booking.paymentMethod === "cash" ? (
                        <>
                          Tiền mặt{" "}
                          {booking.status == 0 && (
                            <span style={{ color: "rgb(11, 93, 167)" }}>
                              ( Vui lòng đến văn phòng gần nhất để thanh toán)
                            </span>
                          )}
                        </>
                      ) : booking.paymentMethod === "vnpay" ? (
                        "VNPAY"
                      ) : booking.paymentMethod === "momo" ? (
                        "Momo"
                      ) : (
                        ""
                      )}
                    </p>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                      Thời hạn thanh toán:
                    </h3>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={16}>
                    <p
                      style={{
                        color: booking.status === 2 ? "red" : "#171717",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                    >
                      {moment(booking.time)
                        .add(8, "hours")
                        .format("DD/MM/YYYY HH:mm")}
                      <span style={{ color: "rgb(11, 93, 167)" }}>
                        {" "}
                        ( 8 giờ sau thời gian đặt nếu không thanh toán booking
                        sẽ được hủy tự động)
                      </span>
                    </p>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={8}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                      Trạng thái:
                    </h3>
                  </Col>
                  <Col style={{ marginTop: 10 }} xs={24} sm={16}>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#171717",
                        fontWeight: 500,
                      }}
                    >
                      {booking.status === 0 ? (
                        <Tag color="gold">Chưa thanh toán</Tag>
                      ) : booking.status === 1 ? (
                        <Tag color="green">Đã thanh toán</Tag>
                      ) : booking.status === 2 ? (
                        <Tag color="red">Đã bị hủy</Tag>
                      ) : (
                        ""
                      )}
                    </p>
                  </Col>
                </Row>
              </Card>
              <Card title="Danh sách hành khách" style={{ marginBottom: 24 }}>
                <Row gutter={20}>
                  <Table
                    scroll={{ x: 790 }}
                    dataSource={dataSource.current}
                    columns={columns}
                    pagination={false}
                  />
                </Row>
                <Flex
                  style={{
                    marginTop: 20,
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "0 10px",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 500 }}>
                    Tổng tiền
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#e01600",
                    }}
                  >
                    {booking.priceDiscount !== 0 && (
                      <span
                        style={{
                          fontSize: "20px",
                          color: "#ccc",
                          textDecoration: "line-through",
                          fontWeight: 500,
                          marginRight: "10px",
                        }}
                      >
                        {formatCurrencyVND(
                          booking.totalPrice + booking.priceDiscount
                        )}
                      </span>
                    )}
                    {formatCurrencyVND(booking.totalPrice)}
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col md={10} sm={24}>
              <Card
                title="Phiếu xác nhận booking"
                style={{ position: "sticky", top: 15 }}
              >
                <Card style={{ marginBottom: 10 }}>
                  <Row gutter={16} style={{ flexWrap: "nowrap" }}>
                    {/* Image Section */}
                    <Col flex="120px">
                      <img
                        src={booking?.tourSchedule?.tour?.images[0]?.url}
                        alt="Cover"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>

                    {/* Content Section */}
                    <Col flex="auto">
                      <span
                        style={{
                          fontWeight: 500,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          wordBreak: "break-word",
                        }}
                      >
                        {booking?.tourSchedule?.tour?.name}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      Khởi hành: {booking?.tourSchedule?.tour?.departure}
                    </Col>
                    <Col span={12}>
                      Thời gian: {booking?.tourSchedule?.tour?.duration} ngày
                    </Col>
                    <Col span={12}>
                      Ngày khởi hành:{" "}
                      {moment(booking?.tourSchedule?.departureDate).format(
                        "DD/MM/YYYY"
                      )}
                    </Col>
                    <Col span={12}>
                      Ngày về:{" "}
                      {moment(booking?.tourSchedule?.returnDate).format(
                        "DD/MM/YYYY"
                      )}{" "}
                    </Col>
                  </Row>
                </Card>
                {booking?.paymentMethod != "cash" && booking.status === 0 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={isSubmitting}
                    onClick={handlePayment}
                  >
                    Thanh toán
                  </Button>
                )}
              </Card>
            </Col>
          </Row>
        </Space>
      )}
    </>
  );
}

export default PaymentBooking;
