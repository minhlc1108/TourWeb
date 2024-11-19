import Card from "antd/es/card/Card";
import { Button, Form, Input, Modal, Space, Table, DatePicker, InputNumber } from "antd";
import { message, modal } from "~/components/EscapeAntd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { createNewPromotionAPI, deletePromotionAPI, fetchAllPromotionAPI, updatePromotionAPI } from "~/apis";
import moment from "moment";

function Promotion() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [itemSelected, setItemSelected] = useState({});
  const [form] = Form.useForm();
  const searchInput = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTexts, setSearchTexts] = useState({});
  const [sorter, setSorter] = useState({ field: "", order: "ascend" });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    count: 0,
  });
  const [data, setData] = useState([]);

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Nhập từ khóa tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => confirm({ closeDropdown: false })}>
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const deleteItem = async (id) => {
    await modal.confirm({
      title: "Xóa khuyến mãi",
      content: "Bạn có muốn xóa khuyến mãi này?",
      onOk: async () => {
        const result = await deletePromotionAPI(id);
        if (result) {
          message.success("Xóa thành công!", 3);
          setData((prevData) => prevData.filter((r) => r.id !== id));
        }
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", sorter: true },
    { title: "Tên khuyến mãi", dataIndex: "name", key: "name", sorter: true, ...getColumnSearchProps("name") },
    { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate", sorter: true },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate", sorter: true },
    { title: "Mức khuyến mãi (%)", dataIndex: "percentage", key: "percentage", sorter: true },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}></Button>
          <Button onClick={() => deleteItem(record.id)} color="danger" icon={<DeleteOutlined />}></Button>
        </Space>
      ),
    },
  ];

  const showModal = (record) => {
    if (record) {
      setTitle("Sửa khuyến mãi");
      setItemSelected(record);

      form.setFieldsValue({
        name: record.name,
        dateRange: [
          record.startDate ? moment(record.startDate, "YYYY-MM-DD") : null,
          record.endDate ? moment(record.endDate, "YYYY-MM-DD") : null,
        ],
        percentage: record.percentage,
      });
    } else {
      setItemSelected(null);
      setTitle("Thêm khuyến mãi");
      form.resetFields();
    }
    setVisible(true);
  };

  const handleSubmit = async (values) => {
    setConfirmLoading(true);

    const [startDate, endDate] = values.dateRange || [];

    const formattedValues = {
      ...values,
      startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
    };

    if (itemSelected) {
      // Chỉnh sửa khuyến mãi
      await updatePromotionAPI(itemSelected.id, formattedValues)
        .then(() => {
          message.success("Cập nhật thành công", 3);
          setData((prevData) =>
            prevData.map((item) =>
              item.id === itemSelected.id ? { ...item, ...formattedValues } : item
            )
          );
          handleCancel();
        })
        .finally(() => setConfirmLoading(false));
    } else {
      // Thêm mới khuyến mãi
      const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

      await createNewPromotionAPI({ ...formattedValues, id: newId })
        .then((result) => {
          message.success("Thêm mới thành công", 3);
          setData((prevData) => [...prevData, { ...result, id: newId, key: newId }]);
          handleCancel();
        })
        .finally(() => setConfirmLoading(false));
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setItemSelected(null);
    form.resetFields();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = {
        ...searchTexts,
        sortBy: sorter.field,
        isDescending: sorter.order === "ascend" ? false : true,
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      };
      const result = await fetchAllPromotionAPI(params);
      setData(result.promotions.map((data) => ({ key: data.id, ...data })));
      setPagination({ ...pagination, total: result.total });
      setIsLoading(false);
    };
    fetchData();
  }, [searchTexts, sorter]);

  const handleTableChange = (newPagination, filters, newSorter) => {
    setPagination(newPagination);
    setSorter({ field: newSorter.field, order: newSorter.order });
  };

  return (
    <Card title="Khuyến mãi" padding="1.25rem 1.25rem 0">
      <Modal
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        title={title}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Tên khuyến mãi"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên khuyến mãi" },
              { max: 255, message: "Tên tối đa 255 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Khoảng thời gian"
            name="dateRange"
            rules={[
              { required: true, message: "Vui lòng chọn khoảng thời gian" },
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2 || value[0].isBefore(value[1], "day")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Ngày bắt đầu phải trước ngày kết thúc"));
                },
              },
            ]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item
            label="Mức khuyến mãi (%)"
            name="percentage"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm khuyến mãi" },
              { type: "number", min: 1, max: 100, message: "Giá trị từ 1 đến 100" },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ margin: "10px 0", float: "left" }}
        type="primary"
      >
        Thêm mới
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
        size="middle"
      />
      
    </Card>
  );
}

export default Promotion;
