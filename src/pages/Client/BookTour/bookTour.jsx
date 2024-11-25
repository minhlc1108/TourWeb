import { Button, Card, Image, Input, Space, Table , Form , Select, DatePicker , InputNumber
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import defaultImage from "~/assets/unnamed.png";
import { useEffect, useRef, useState } from "react";
import { message, modal } from "~/components/EscapeAntd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {fetchAllTourAPI, fetchTourAPI_ById} from "~/apis";
import { useParams } from 'react-router-dom';
import Book_Schedule from "~/pages/Client/BookTour/booking_schedule.jsx";

function BookTourPage() {
    const location = useLocation();
    const isChild = location.pathname.includes("/create") ||  location.pathname.includes("/edit") ;
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTexts, setSearchTexts] = useState({});
    const [sorter, setSorter] = useState({ field: "", order: "ascend" });
    const [tour, setTour] = useState({});
    
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        count: 0,
    });
    const { tour_id } = useParams();
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTexts({
            ...searchTexts,
            [dataIndex]: selectedKeys[0],
        });
    };

    const handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        const updatedSearchTexts = { ...searchTexts };
        delete updatedSearchTexts[dataIndex];
        setSearchTexts(updatedSearchTexts);
    };

    const deleteItem = async (id) => {
        await modal.confirm({
            title: "Xóa tour",
            content: "Bạn có muốn xóa tour này?",
            onOk: async () => {
                // const result = await deleteCategoryAPI(id);
                // if (result) {
                //   message.success("Xóa thành công!", 3);
                //   setData((prevData) => prevData.filter((r) => r.id !== id));
                // }
            },
        });
    };
    
    useEffect(() => {
        fetchTourAPI_ById(tour_id).then((data) => {
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
    const onFinish = (values) => {
        console.log('Received values of form:', values);
        // Gửi dữ liệu form đến backend ở đây
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

            {/* ... các Form.Item khác tương tự */}

            <Form.Item label="Thông tin tour">
                <Book_Schedule tour={tour} />
            </Form.Item>
            
        </Form>
    </>
    );
}

export default BookTourPage;
