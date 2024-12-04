import React, { useEffect, useState }  from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber,Card,
    Divider, Typography,  
    Checkbox} from 'antd';
import { MinusOutlined, PlusOutlined, UserOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import {createBookingAPI, getTourByIdAPI, getTourScheduleByIdAPI} from "~/apis/index.js";
import {message} from "~/components/EscapeAntd/index.jsx";
import FormDataBooking from "~/pages/Client/BookTour/BOOK/FormDataBooking.jsx";
import {useNavigate} from "react-router-dom";

const { Option } = Select;

function ContactForm () {
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(false); // Trạng thái checkbox

    const [toursSchedule, setToursSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmit, setIsSubmitting] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect((tour_id) => {
        // Hàm lấy dữ liệu tour
        const fetchTours = async () => {
            setIsLoading(true); // Đặt trạng thái đang tải khi bắt đầu gọi API
            try {
                const response = await getTourScheduleByIdAPI(tour_id); // Gọi API
                if (response?.data?.tour) {
                    setToursSchedule(response.data.tour); // Cập nhật danh sách tour
                } else {
                    throw new Error('Dữ liệu tour không hợp lệ'); // Xử lý nếu dữ liệu không hợp lệ
                }
            } catch (err) {
                console.error(err); // Log chi tiết lỗi ra console
                setError('Lỗi khi gọi API: ' + (err.message || 'Không thể kết nối')); // Cập nhật lỗi
            } finally {
                setIsLoading(false); // Đảm bảo trạng thái không còn đang tải khi đã hoàn tất
            }
        };

        fetchTours(); // Gọi hàm lấy dữ liệu khi component mount
    }, []); // [] để chỉ chạy 1 lần khi component mount
    
    const handleCheckboxChange = (e) => {
        setPaymentMethod(e.target.checked);
    };
    const { Title } = Typography;
    const handleAdultChange = (value) => {
        setAdultCount(value);
        calculateTotal(value, childCount);
    };

    const handleChildChange = (value) => {
        setChildCount(value);
        calculateTotal(adultCount, value);
    };

    const calculateTotal = (adults, children) => {
        const total = (adults * toursSchedule.priceAdult) + (children * toursSchedule.priceChild);
        setTotalPrice(total);
    };
    
    const AdultChange = () => {
        return (<Row gutter={8}>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<MinusOutlined />}
                    onClick={() => handleAdultChange(adultCount - 1)}
                    disabled={adultCount <= 0}
                />
            </Col>
            <Col span={8}>
                <InputNumber
                    min={0}
                    value={adultCount}
                    onChange={handleAdultChange}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleAdultChange(adultCount + 1)}
                />
            </Col>
        </Row>)
    }
    const onFinish = async (values) => {
        // Bật trạng thái đang submit
        setIsSubmitting(true);
        alert(123);
        try {
            // Gửi dữ liệu booking
            const booking = await createBookingAPI({ ...values });

            if (booking) {
                message.success("Đặt vé thành công!");
                
                // Điều hướng hoặc các hành động tiếp theo sau khi đặt vé thành công
                // navigate(`/admin/tour/edit?id=${createdTour.id}`); // Nếu cần điều hướng
            }
        } catch (error) {
            // Xử lý lỗi khi API gọi không thành công
            message.error("Có lỗi xảy ra trong quá trình đặt vé. Vui lòng thử lại!");
            console.error("Error creating booking:", error); // In lỗi để debug
        } finally {
            // Tắt trạng thái submit dù có thành công hay lỗi
            setIsSubmitting(false);
            navigate('/PayMethod');
        }
    };


    const ChildChange = () =>{
        return (<Row gutter={8}>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<MinusOutlined />}
                    onClick={() => handleChildChange(childCount - 1)}
                    disabled={childCount <= 0}
                />
            </Col>
            <Col span={8}>
                <InputNumber
                    min={0}
                    value={childCount}
                    onChange={handleChildChange}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col span={8}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleChildChange(childCount + 1)}
                />
            </Col>
        </Row>)
    }
    
    
    const Submit_Form = () => {
        return (
        <div className="customer-form">
            {/* Thông tin hành khách */}
            <div className="count-customer mt-2">
                <Title level={4} className="text-bold-color">Hành khách</Title>
                <div id="count-customer">
                  <span className="tour-title">
                    <UserOutlined/> {adultCount + childCount} người
                  </span>
                </div>
            </div>

            {/* Tổng tiền */}
            <div className="total mt-2">
                <Title level={5} className="tour-title">Tổng tiền</Title>
                <div id="total-price">
                    <span>{totalPrice.toLocaleString()} VND</span>
                </div>
            </div>

            {/* Nút Đặt tour */}
            <Button
                type="primary" // Chọn màu nền chính (có thể thay đổi sang 'danger' nếu bạn muốn)
                htmlType="submit" // Thêm htmlType="submit"
                style={{
                    width: '100%',
                    borderRadius: '8px',  // Bo góc nút
                    fontSize: '16px',  // Thay đổi kích thước font
                    fontWeight: 'bold',  // Làm cho văn bản đậm hơn
                    padding: '10px 20px',  // Thêm khoảng cách bên trong nút
                    transition: 'all 0.3s ease',  // Thêm hiệu ứng chuyển đổi khi hover
                }}
                id="reserve"
                // disabled={totalPrice === 0 || !paymentMethod} // Vô hiệu hóa nếu chưa chọn hình thức thanh toán
                className={totalPrice === 0 || !paymentMethod ? 'button-disabled' : ''}
            >
                Đặt tour
            </Button>

        </div>)
    };

    
    const component = () => {
        return (
            <div className="home-container">
                <Form layout="vertical" className="p-3 m-3"
                      onFinish={onFinish}>
                    <div style={{padding: '50px'}}>
                        {/* Row để căn giữa nội dung */}
                        <Row justify="center">
                            {/* Col để chia thành 2 cột */}
                            <Col xs={24} sm={12} lg={8}>
                                <FormDataBooking AdultChange={AdultChange} ChildChange={ChildChange} handleCheckboxChange={handleCheckboxChange}
                                                 paymentMethod={paymentMethod}
                                />
                            </Col>
                            <Col xs={24} sm={12} lg={8}>
                                <Card title="Thông tin thanh toán" bordered={false}>
                                    <Submit_Form/>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        component()
        // <div>
        //     <h2>Danh sách tour</h2>
        //     <ul>
        //         {tours.map((tour) => (
        //             <li key={tour.id}>{tour.name}</li> // Giả sử mỗi tour có thuộc tính `id` và `name`
        //         ))}
        //     </ul>
        // </div>
    );
    
};

export default ContactForm;
