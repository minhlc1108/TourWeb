import { Button, Card, Image, Input, Space, Table , Form , Select, DatePicker , InputNumber
} from "antd";

import { useEffect, useRef, useState } from "react";
import { message, modal } from "~/components/EscapeAntd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {createBookingAPI, createNewTourAPI, getTourByIdAPI} from "~/apis";
import { useParams } from 'react-router-dom';
import Book_Schedule from "~/pages/Client/BookTour/booking_schedule.jsx";

function BookTourPage() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [searchTexts, setSearchTexts] = useState({});
    const [tour, setTour] = useState({});
    
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        count: 0,
    });
    const { tour_id } = useParams();
    
    
    useEffect(() => {
        getTourByIdAPI(tour_id).then((data) => {
            setIsLoading(false);
            setTour(tour);
            setData(data.tours.map((tour) => ({ key: tour.id, ...tour})));
            setIsLoading(false);
            setPagination({
                ...pagination,
                total: data.total,
            });
        }).catch(() => message.error("Lỗi khi gọi api"));
    });

    
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const [sum, setSum] = useState(0);
    const handleIncrementAdult = () => {
        setAdult(adult + 1);
        setSum(adult*tour.priceAdult + children*tour.priceChild);
    };

    const handleDecrementAdult = () => {
        if (adult > 0) {
            setAdult(adult - 1);
            setSum(adult*tour.priceAdult + children*tour.priceChild);
        }
    };
    const handleIncrementChild = () => {
        setChildren(children + 1);
    };

    const handleDecrementChild = () => {
        if (children > 0) {
            setChildren(children - 1);
        }
    };
    const onFinish = async (values) => {
        setIsSubmitting(true);
        const booking = await createBookingAPI({
            ...values
        });
        if (booking) {
            message.success("Đặt vé thành công!");
            // navigate(`/admin/tour/edit?id=${createdTour.id}`);
        }
        setIsSubmitting(false);
    };

    return (
        <>
        
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{required: true, message: 'Vui lòng nhập họ và tên!'}]}
            >
                <Input
                />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{type: 'email', message: 'Email không hợp lệ!'}]}
            >
                <Input/>
            </Form.Item>

            {/* ... các Form.Item khác tương tự */}

            <Form.Item
                label="Adult"
            >
                <Button onClick={handleDecrementAdult}>-</Button>
                <InputNumber value={adult} onChange={setAdult}/>
                <Button onClick={handleIncrementAdult}>+</Button>
            </Form.Item>
            <Form.Item
                label="Child"
            >
                <Button onClick={handleDecrementChild}>-</Button>
                <InputNumber value={children} onChange={setChildren}/>
                <Button onClick={handleIncrementChild}>+</Button>
            </Form.Item>

            <Form.Item
                label="Tổng tiền"
                name="sum_money"
            >
                {sum}
            </Form.Item>

            <Form.Item
                label="Tour ID"
                name="sum_money"
            >
                {tour_id}
            </Form.Item>

            {/* ... các Form.Item khác tương tự */}

            <Form.Item label="Thông tin tour">
                <Book_Schedule tour={tour} />
            </Form.Item>
            
        </Form>
    </>
    );
}

function header (){
    return (
        <div className="row p-2 m-3">
            <div className="col-12 col-sm-6 col-md-4 p-2 col-step">
                <div className="item-step">
                    <i className="fa fa-receipt item-icon"></i>
                    <p className="font-weight-bold">NHẬP THÔNG TIN</p>
                </div>
                <i className="fa fa-arrow-right"></i>
            </div>
            <div className="col-12 col-sm-6 col-md-4 p-2 col-step">
                <div className="item-step">
                    <i className="fa fa-credit-card item-icon"></i>
                    <p className="font-weight-bold">THANH TOÁN</p>
                </div>
                <i className="fa fa-arrow-right"></i>
            </div>
            <div className="col-12 col-sm-6 col-md-4 p-2 col-step">
                <div className="item-step">
                    <i className="fa fa-clipboard-check item-icon"></i>
                    <p className="font-weight-bold">HOÀN TẤT</p>
                </div>
            </div>
        </div>
    )
}

function tour_infor(){
    return (
        <div className="row p-2 m-3 badge-light rounded-20">
            <div className="col-12 col-md-4 p-2 col-step">
                <img src="/admin/images/0.jpg" className="img-fluid" alt="Image"/>
            </div>
            <div className="col-12 col-md-8 p-2">
                <div>
                    <p className="tour-title">{tourReserveResponse?.tourName}</p>
                    <p className="text-color">
                        Điểm đến: <span className="text-bold-color">{tourReserveResponse?.country}</span>
                    </p>
                    <p className="text-color">
                        Nơi khởi hành: <span className="text-bold-color">{tourReserveResponse?.departureLocation}</span>
                    </p>
                    <p className="text-color">
                        Khởi hành: <span className="text-bold-color">{tourReserveResponse?.departureDate}</span>
                    </p>
                    <p className="text-color">
                        Số chỗ còn nhận: <span className="text-bold-color"
                                               id="quantity-left">{tourReserveResponse?.quantityLeft}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}


function bookTour() {
    return (
        <>
            <div className="count-customer mt-2">
                <p className="text-bold-color"> Hành khách </p>
                <div id="count-customer">
                    <span className="tour-title"><i className="fa fa-user"></i> 1 người</span>
                </div>
            </div>
            <div class="adult mt-4">
                <p class="text-color">Người lớn</p>
                <input type="hidden" id="inp-price-adult" th:value="${tourReserveResponse.priceAdult}"/>
                <div id="price-adult">
                </div>
            </div>
            <input type="hidden" id="inp-price-child" th:value="${tourReserveResponse.priceChild}"/>
            <div class="mb-1" id="price-child">
        
            </div>
            <div class="total mt-2">
                <p class="tour-title">Tổng tiền</p>
                <div id="total-price">
        
                </div>
            </div>
            <button 
                type="button" 
                class="btn btn-danger" 
                style="width: 100%"
                id="reserve" disabled
            >Đặt tour
            </button>
        </>
    )
}

export default BookTourPage;
