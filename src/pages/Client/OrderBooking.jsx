import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Steps,
} from "antd";
import { Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomInputNumber } from "~/components/CustomInputNumber";
import CashImage from "~/assets/cash-icon.svg";
import MoMoImage from "~/assets/momo.png";
import VNPayImage from "~/assets/vnpay.png";
import {
  createBookingAPI,
  fetchTourScheduleByIdAPI,
  getPromotionByCodeAPI,
} from "~/apis";
import moment from "moment";
import { formatCurrencyVND } from "~/utils/format";
import { message } from "~/components/EscapeAntd";
const { Title } = Typography;
function OrderBooking() {
  const navigate = useNavigate();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [tourSchedule, setTourSchedule] = useState(null);
  const [isApply, setIsApply] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let discount = useRef(null);
  const [form] = Form.useForm();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTourScheduleByIdAPI(id)
        .then((data) => {
          setTourSchedule(data);
          if (data.remain === 0) {
            message.error("Tour hiện tại đã hết chỗ!");
            new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
              navigate(-1);
            });
          } else if (data.remain < adultCount + childCount) {
            message.error(`Tour hiện tại chỉ còn ${data.remain} chỗ!`);
          }
        })
        .catch((error) => {
          navigate("/404");
        });
    }
  }, [id, navigate]);

  const checkFormValidity = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);

    if (hasErrors) {
      message.error("Vui lòng điền đầy đủ và chính xác thông tin!");
    }
  };

  const handleSubmit = async (values) => {
    const adults = [];
    const children = [];

    // Lấy thông tin người lớn
    for (let i = 0; i < adultCount; i++) {
      adults.push({
        name: values[`name_adult_${i}`],
        birthday: values[`birthDate_adult_${i}`].format("YYYY-MM-DD"),
        sex: values[`gender_adult_${i}`],
        price: tourSchedule.priceAdult,
      });
    }

    // Lấy thông tin trẻ em
    for (let i = 0; i < childCount; i++) {
      children.push({
        name: values[`name_child_${i}`],
        birthday: values[`birthDate_child_${i}`].format("YYYY-MM-DD"),
        sex: values[`gender_child_${i}`],
        price: tourSchedule.priceChild,
      });
    }
    const customers = [...adults, ...children];
    setIsSubmitting(true);
    await createBookingAPI({
      customers,
      tourScheduleId: tourSchedule.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      address: values.address,
      paymentMethod: values.paymentMethod,
      totalPrice: discount.current
        ? (adultCount * tourSchedule.priceAdult +
            childCount * tourSchedule.priceChild) *
          (1 - discount.current?.percentage / 100)
        : adultCount * tourSchedule.priceAdult +
          childCount * tourSchedule.priceChild,
      priceDiscount: discount.current
        ? ((adultCount * tourSchedule.priceAdult +
            childCount * tourSchedule.priceChild) *
            discount.current?.percentage) /
          100
        : 0,
      promotionId: discount.current ? discount.current.id : null,
      adultCount,
      childCount,
    })
      .then((data) => {
        navigate(`/payment-booking/${data.id}`);
      })
      .catch(() => {
        fetchTourScheduleByIdAPI(id).then((data) => {
          setTourSchedule(data);
        });
        setIsSubmitting(false);
      }).finally(() => {
        setIsSubmitting(false);
        form.resetFields();
      })
      ;
  };

  return (
    <>
      {!tourSchedule ? (
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
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => {
              navigate(-1);
            }}
            style={{ marginBottom: 16 }}
          >
            Quay lại
          </Button>
          <Title
            level={2}
            style={{ textAlign: "center", color: "#0b5da7", fontWeight: 700 }}
          >
            ĐẶT TOUR
          </Title>
          <Steps
            labelPlacement="vertical"
            current={0}
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

          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Row gutter={20}>
              <Col md={14} sm={24}>
                <Card title="Thông tin liên lạc" style={{ marginBottom: 24 }}>
                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Họ tên không được để trống!",
                          },
                        ]}
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Số điện thoại không được để trống!",
                          },
                          {
                            pattern: "^0[0-9]{9}$",
                            message: "Số điện thoại không đúng định dạng!",
                          },
                        ]}
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Email không được để trống!",
                          },
                          {
                            pattern:
                              "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                            message: "Email không đúng định dạng!",
                          },
                        ]}
                      >
                        <Input type="email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Địa chỉ" name="address">
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="Hành khách" style={{ marginBottom: 24 }}>
                  <Row gutter={20}>
                    <Col md={12} sm={24}>
                      <Form.Item
                        label="Người lớn"
                        name="adults"
                        tooltip="Trên 12 tuổi"
                        initialValue={1}
                      >
                        <CustomInputNumber
                          min={1}
                          onChange={(value) => setAdultCount(value)}
                          currentQuantity={adultCount + childCount}
                          tourSchedule={tourSchedule}
                          step={1}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={24}>
                      <Form.Item
                        label="Trẻ em"
                        tooltip="Dưới 12 tuổi"
                        name="children"
                        initialValue={0}
                      >
                        <CustomInputNumber
                          min={0}
                          tourSchedule={tourSchedule}
                          onChange={(value) => setChildCount(value)}
                          currentQuantity={adultCount + childCount}
                          step={1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="Thông tin hành khách" style={{ marginBottom: 24 }}>
                  {adultCount > 0 &&
                    Array.from({ length: adultCount }, (_, index) => (
                      <Card
                        key={index}
                        title={`Thông tin người lớn ${index + 1}`}
                        style={{
                          marginBottom: 16,
                          border: "1px solid #d9d9d9",
                          borderRadius: "8px",
                        }}
                      >
                        <Row gutter={10}>
                          <Col md={10}>
                            <Form.Item
                              label="Họ Tên"
                              name={`name_adult_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập họ tên!",
                                },
                              ]}
                            >
                              <Input placeholder="Nhập họ tên" />
                            </Form.Item>
                          </Col>
                          <Col md={8}>
                            <Form.Item
                              label="Ngày Sinh"
                              name={`birthDate_adult_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn ngày sinh!",
                                },
                              ]}
                            >
                              <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày sinh"
                                disabledDate={(current) => {
                                  return (
                                    current &&
                                    current >
                                      moment()
                                        .subtract(12, "years")
                                        .endOf("day")
                                  );
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={6}>
                            <Form.Item
                              label="Giới Tính"
                              name={`gender_adult_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn giới tính!",
                                },
                              ]}
                            >
                              <Select placeholder="Chọn giới tính">
                                <Select.Option value="1">Nam</Select.Option>
                                <Select.Option value="0">Nữ</Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  {childCount > 0 &&
                    Array.from({ length: childCount }, (_, index) => (
                      <Card
                        key={index}
                        title={`Thông tin trẻ em ${index + 1}`}
                        style={{
                          marginBottom: 16,
                          border: "1px solid #d9d9d9",
                          borderRadius: "8px",
                        }}
                      >
                        <Row gutter={10}>
                          <Col md={10}>
                            <Form.Item
                              label="Họ Tên"
                              name={`name_child_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập họ tên!",
                                },
                              ]}
                            >
                              <Input placeholder="Nhập họ tên" />
                            </Form.Item>
                          </Col>
                          <Col md={8}>
                            <Form.Item
                              label="Ngày Sinh"
                              name={`birthDate_child_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn ngày sinh!",
                                },
                              ]}
                            >
                              <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày sinh"
                                disabledDate={(current) => {
                                  return (
                                    current &&
                                    (current <
                                      moment()
                                        .subtract(12, "years")
                                        .endOf("day") ||
                                      current > new Date().setHours(0, 0, 0, 0))
                                  );
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={6}>
                            <Form.Item
                              label="Giới Tính"
                              name={`gender_child_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn giới tính!",
                                },
                              ]}
                            >
                              <Select placeholder="Chọn giới tính">
                                <Select.Option value="1">Nam</Select.Option>
                                <Select.Option value="0">Nữ</Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                </Card>
                <Card
                  title="Các hình thức thanh toán"
                  style={{ marginBottom: 24 }}
                >
                  <Form.Item
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phương thức thanh toán!",
                      },
                    ]}
                  >
                    <Radio.Group style={{ width: "100%" }}>
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "8px",
                          padding: "8px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Radio value="cash" style={{ width: "100%" }}>
                          <Flex align="center">
                            <img
                              src={CashImage}
                              alt="Cash"
                              style={{
                                marginRight: 8,
                                height: "50px",
                                width: "50px",
                              }}
                            />
                            <span style={{ fontSize: "16px", fontWeight: 600 }}>
                              Tiền mặt
                            </span>
                          </Flex>
                        </Radio>
                      </div>
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "8px",
                          padding: "8px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Radio value="momo" style={{ width: "100%" }}>
                          <Flex align="center">
                            <img
                              src={MoMoImage}
                              alt="MoMo"
                              style={{
                                marginRight: 8,
                                height: "50px",
                                width: "50px",
                              }}
                            />
                            <span style={{ fontSize: "16px", fontWeight: 600 }}>
                              Momo
                            </span>
                          </Flex>
                        </Radio>
                      </div>
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "8px",
                          padding: "8px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Radio value="vnpay" style={{ width: "100%" }}>
                          <Flex align="center">
                            <img
                              src={VNPayImage}
                              alt="VNPay"
                              style={{
                                marginRight: 8,
                                height: "50px",
                                width: "50px",
                              }}
                            />
                            <span style={{ fontSize: "16px", fontWeight: 600 }}>
                              VNPay
                            </span>
                          </Flex>
                        </Radio>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </Card>
              </Col>
              <Col md={10} sm={24}>
                <Card
                  title="Tóm tắt chuyến đi"
                  style={{ position: "sticky", top: 15 }}
                >
                  <Card style={{ marginBottom: 10 }}>
                    <Row gutter={16} style={{ flexWrap: "nowrap" }}>
                      {/* Image Section */}
                      <Col flex="120px">
                        <img
                          src={tourSchedule.tour.images[0].url}
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
                          {tourSchedule.tour.name}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        Khởi hành: {tourSchedule.tour?.departure}
                      </Col>
                      <Col span={12}>
                        Thời gian: {tourSchedule.tour?.duration} ngày
                      </Col>
                      <Col span={12}>
                        Ngày khởi hành:{" "}
                        {moment(tourSchedule.departureDate).format(
                          "DD/MM/YYYY"
                        )}
                      </Col>
                      <Col span={12}>
                        Ngày về:{" "}
                        {moment(tourSchedule.returnDate).format("DD/MM/YYYY")}{" "}
                      </Col>
                    </Row>
                  </Card>
                  <Card style={{ marginBottom: 10 }} title="Khách hàng">
                    {adultCount > 0 && (
                      <Row justify="space-between">
                        <Col>Người lớn: </Col>
                        <Col>
                          {" "}
                          {adultCount} x{" "}
                          {formatCurrencyVND(tourSchedule.priceAdult)}
                        </Col>
                      </Row>
                    )}
                    {childCount > 0 && (
                      <Row justify="space-between">
                        <Col>Trẻ em: </Col>
                        <Col>
                          {" "}
                          {childCount} x{" "}
                          {formatCurrencyVND(tourSchedule.priceChild)}
                        </Col>
                      </Row>
                    )}
                    <Divider></Divider>
                    <Row justify="space-between">
                      <Col span={18}>
                        <Form.Item name="code">
                          <Flex gap={4}>
                            <Input
                              disabled={isApply}
                              placeholder="Mã giảm giá"
                            />
                            {isApply && (
                              <Button
                                onClick={() => {
                                  setIsApply(false);
                                  discount.current = 0;
                                }}
                              >
                                Hủy
                              </Button>
                            )}
                          </Flex>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Button
                          disabled={isApply}
                          onClick={() => {
                            const code = form.getFieldValue("code");
                            getPromotionByCodeAPI(code).then((data) => {
                              discount.current = data;
                              setIsApply(true);
                            });
                          }}
                        >
                          Áp dụng
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                    <Row justify="space-between">
                      <Col style={{ fontWeight: 600, fontSize: "24px" }}>
                        Tổng tiền:
                        {isApply && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "16px",
                              textDecoration: "line-through",
                              color: "#ccc",
                            }}
                          >
                            {formatCurrencyVND(
                              adultCount * tourSchedule.priceAdult +
                                childCount * tourSchedule.priceChild
                            )}
                          </span>
                        )}
                      </Col>
                      <Col
                        style={{
                          fontWeight: 600,
                          fontSize: "24px",
                          color: "red",
                        }}
                      >
                        {discount.current
                          ? formatCurrencyVND(
                              (adultCount * tourSchedule.priceAdult +
                                childCount * tourSchedule.priceChild) *
                                (1 - discount.current?.percentage / 100)
                            )
                          : formatCurrencyVND(
                              adultCount * tourSchedule.priceAdult +
                                childCount * tourSchedule.priceChild
                            )}
                      </Col>
                    </Row>
                  </Card>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={isSubmitting}
                    onClick={checkFormValidity}
                  >
                    Xác nhận
                  </Button>
                </Card>
              </Col>
            </Row>
          </Form>
        </Space>
      )}
    </>
  );
}

export default OrderBooking;
