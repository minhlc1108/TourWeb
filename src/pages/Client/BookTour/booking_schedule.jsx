import { Button, Card, Image, Input, Space, Table, Typography } from "antd";
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
import { fetchAllTourAPI } from "~/apis";

function Book_Schedule() {
    const location = useLocation();
    const isChild = location.pathname.includes("/create") ||  location.pathname.includes("/edit") ;
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTexts, setSearchTexts] = useState({});
    const [sorter, setSorter] = useState({ field: "", order: "ascend" });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        count: 0,
    });

    const [data, setData] = useState(
        {
            key: 1,
            id: 1,
            image:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            name: "hihi",
            departureDate: "20/11/2024", 
            returnDate: "23/11/2024",
            quantity: "5",
            priceAdult: 500, 
            priceChild: 3000
    

        },
    );

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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                             close,
                         }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Nhập từ khóa tìm kiếm`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchTexts({
                                ...searchTexts,
                                [dataIndex]: selectedKeys[0],
                            });
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

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

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: true,
        },
        {
            title: "",
            dataIndex: "images",
            key: "images",
            render: (images) => {
                return (
                    <Image src={images[0]?.url ? images[0].url : defaultImage} style={{ minWidth: 50 }} />
                );
            },
        },
        {
            title: "Tên tour",
            dataIndex: "name",
            key: "name",
            sorter: true,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Điểm khởi hành",
            dataIndex: "departure",
            key: "departure",
            sorter: true,
            ...getColumnSearchProps("departure"),
        },
        {
            title: "Điểm đến",
            dataIndex: "destination",
            key: "destination",
            sorter: true,
            ...getColumnSearchProps("destination"),
        },
        {
            title: "Danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
            sorter: true,
            ...getColumnSearchProps("categoryName"),
        },
        {
            title: "Số lượng (người)",
            dataIndex: "quantity",
            key: "quantity",
            sorter: true,
            ...getColumnSearchProps("quantity"),
        },
        {
            title: "Thời lượng (ngày)",
            dataIndex: "duration",
            key: "duration",
            sorter: true,
            ...getColumnSearchProps("duration"),
        },
        {
            title: "Hành động",
            dataIndex: "",
            key: "x",
            render: (record) => {
                return (
                    <Space size="small">
                        <Button
                            variant="outlined"
                            icon={<EditOutlined />}
                            onClick={() => {navigate(`/admin/tour/edit?id=${record.id}`)}}
                        ></Button>
                        <Button
                            onClick={() => deleteItem(record.id)}
                            color="danger"
                            variant="outlined"
                            icon={<DeleteOutlined />}
                        ></Button>
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        const params = {
            ...searchTexts,
            sortBy: sorter.field,
            isDecsending: sorter.order === "ascend" ? false : true,
            pageNumber: pagination.current,
            pageSize: pagination.pageSize,
        };
        fetchAllTourAPI(params).then((data) => {
            setIsLoading(false);
            setData(data.tours.map((tour) => ({ key: tour.id, ...tour})));
            setIsLoading(false);
            setPagination({
                ...pagination,
                total: data.total,
            });
        }).catch(() => message.error("Lỗi khi gọi api"));
    },[searchTexts, sorter, pagination.current, pagination.pageSize]);

    const handleTableChange = (newPagination, filters, newSorter) => {
        setPagination(newPagination);
        setSorter({ field: newSorter.field, order: newSorter.order });
    };

    return (
        <>
            {!isChild && (
                <Card>
                        
                    <div container spacing={2}>
                        <div item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Tên tour:</strong> {data.name}
                            </Typography>
                        </div>
                        <div item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Ngày khởi hành:</strong> {data.departureDate}
                            </Typography>
                        </div>
                        <div item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Ngày kết thúc:</strong> {data.returnDate}
                            </Typography>
                        </div>
                        <div item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Số lượng:</strong> {data.quantity}
                            </Typography>
                        </div>
                        <div item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Giá người lớn:</strong> {data.priceAdult}
                            </Typography>
                        </div>
                        <div item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Giá trẻ em:</strong> {data.priceChild}
                            </Typography>
                        </div>
                        {/* ... các trường khác ... */}
                    </div>
                </Card>
            )}
            <Outlet/>
        </>
    );
}

export default Book_Schedule;