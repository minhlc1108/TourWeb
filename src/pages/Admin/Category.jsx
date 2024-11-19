import Card from "antd/es/card/Card";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { message, modal } from "~/components/EscapeAntd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import {
  createNewCategoryAPI,
  deleteCategoryAPI,
  fetchAllCategoryAPI,
  updateCategoryAPI,
} from "~/apis";

function Category() {
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
    total: 0,
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
    // onFilter: (value, record) =>
    //   record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const deleteItem = async (id) => {
    await modal.confirm({
      title: "Xóa danh mục",
      content: "Bạn có muốn xóa danh mục này?",
      onOk: async () => {
        const result = await deleteCategoryAPI(id);
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Mô tả",
      dataIndex: "detail",
      key: "detail",
      sorter: true,
      ...getColumnSearchProps("detail"),
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
              onClick={() => showModal(record)}
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

  const showModal = (record) => {
    if (record) {
      setTitle("Sửa danh mục");
      setItemSelected(record);
      form.setFieldsValue({ name: record.name, detail: record.detail });
    } else {
      setItemSelected(null);
      setTitle("Thêm danh mục");
    }
    setVisible(true);
  };

  const handleSubmit = async (values) => {
    if (itemSelected) {
      setConfirmLoading(true);
      await updateCategoryAPI(itemSelected.id, values)
        .then(() => {
          setConfirmLoading(false);
          message.success("Thành công", 3);
          setData((prevData) =>
            prevData.map((item) =>
              item.key === itemSelected.key
                ? {
                    ...item,
                    key: itemSelected.id, // Update key if needed
                    id: itemSelected.id,
                    name: values.name,
                    detail: values.detail,
                  }
                : item
            )
          );
          handleCancel();
        })
        .catch(() => {
          setConfirmLoading(false);
        });
    } else {
      setConfirmLoading(true);
      await createNewCategoryAPI(values)
        .then((result) => {
          setConfirmLoading(false);
          message.success("Thành công", 3);
          setData((prevData) => {
            return [...prevData, { ...result, key: result?.id }];
          });
          handleCancel();
        })
        .catch(() => {
          setConfirmLoading(false);
        });
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setItemSelected(null);
    form.resetFields();
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

    fetchAllCategoryAPI(params).then((data) => {
      setData(data.categories.map((category) => ({ key: category.id, ...category })));
      setIsLoading(false);
      setPagination({
        ...pagination,
        total: data.total,
      });
    }).catch(() => message.error("Lỗi khi gọi api"));
  }, [searchTexts, sorter, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination, filters, newSorter) => {
    setPagination(newPagination);
    setSorter({ field: newSorter.field, order: newSorter.order });
  };

  return (
    <Card title="Danh mục" padding="1.25rem 1.25rem 0">
      <Modal
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        title={title}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên danh mục",
              },
              {
                max: 255,
                message: "Tên danh mục tối đa 255 ký tự",
              },
            ]}
          >
            <Input width={"100%"} />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="detail"
            rules={[
              {
                max: 255,
                message: "Mô tả tối đa 255 ký tự",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          color="primary"
          variant="solid"
          icon={<PlusOutlined />}
          iconPosition={"start"}
          onClick={() => showModal()}
        >
          Thêm
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
        scroll={{ x: 800 }}
      ></Table>
    </Card>
  );
}

export default Category;
