import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { createNewTourScheduleAPI, deleteTourScheduleAPI, getTourSchedulesAPI, updateTourScheduleAPI } from "~/apis";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { message, modal } from "../EscapeAntd";

function TourScheduleTable({ dataTable, tourId }) {
  const searchInput = useRef(null);
  const [searchTexts, setSearchTexts] = useState({});
  const [sorter, setSorter] = useState({ field: "", order: "ascend" });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [itemSelected, setItemSelected] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formTourSchedule] = Form.useForm();

  const [data, setData] = useState(dataTable);

  useEffect(() => {
    const params = {
      ...searchTexts,
      sortBy: sorter.field,
      isDecsending: sorter.order === "ascend" ? false : true,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
      tourId: tourId,
    };

    setIsLoading(true);
    getTourSchedulesAPI(params).then((data) => {
      setData(
        data.tourSchedules.map((tourSchedule) => ({
          key: tourSchedule.id,
          ...tourSchedule,
        }))
      );
      setPagination({
        ...pagination,
        total: data.total,
      });
    });
    setIsLoading(false);
  }, [
    searchTexts,
    sorter.field,
    sorter.order,
    pagination.pageSize,
    pagination.current,
  ]);
  const showModal = (record) => {
    if (record) {
      setTitle("Sửa lịch tour");
      setItemSelected(record);
      formTourSchedule.setFieldsValue({
        name: record.name,
        departureDate: moment(record.departureDate),
        priceAdult: record.priceAdult,
        priceChild: record.priceChild,
      });
    } else {
      setItemSelected(null);
      setTitle("Thêm lịch tour");
    }
    setVisible(true);
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Tên lịch trình",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ngày khởi hành",
      dataIndex: "departureDate",
      key: "departureDate",
      sorter: true,
    },
    {
      title: "Ngày về",
      dataIndex: "returnDate",
      key: "returnDate",
      sorter: true,
    },
    {
      title: "Còn lại",
      dataIndex: "remain",
      key: "remain",
      sorter: true,
    },
    {
      title: "Giá người lớn",
      dataIndex: "priceAdult",
      key: "priceAdult",
      sorter: true,
    },
    {
      title: "Giá trẻ em",
      dataIndex: "priceChild",
      key: "priceChild",
      sorter: true,
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

  const deleteItem = async (id) => {
    await modal.confirm({
      title: "Xóa lịch tour",
      content: "Bạn có muốn xóa lịch tour này?",
      onOk: async () => {
        const result = await deleteTourScheduleAPI(id);
        if (result) {
          message.success("Xóa thành công!", 3);
          setData((prevData) => prevData.filter((r) => r.id !== id));
        }
      },
    });
  };

  const handleTableChange = (newPagination, filters, newSorter) => {
    setPagination(newPagination);
    setSorter({ field: newSorter.field, order: newSorter.order });
  };

  const disablePastDates = (current) => {
    const today = new Date(); // Lấy ngày hôm nay
    today.setHours(0, 0, 0, 0); // Đặt thời gian là 0:00:00 để so sánh chính xác
    return current && current < today; // Vô hiệu hóa các ngày trước hôm nay
  };

  const handleTourScheduleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      departureDate: values.departureDate.format("YYYY-MM-DD"),
      tourId: tourId,
    };

    if (itemSelected) {
      setConfirmLoading(true);
      await updateTourScheduleAPI(itemSelected.id, {name: formattedValues.name, priceAdult: formattedValues.priceAdult, priceChild: formattedValues.priceChild})
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
                  name: formattedValues.name,
                  priceAdult: formattedValues.priceAdult,
                  priceChild: formattedValues.priceChild
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
      await createNewTourScheduleAPI(formattedValues)
        .then((result) => {
          console.log(result);
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
    formTourSchedule.resetFields();
  };

  return (
    <>
      <Modal
        open={visible}
        onOk={formTourSchedule.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        title={title}
      >
        <Form
          name="tourScheduleForm"
          labelCol={{
            span: 6,
          }}
          form={formTourSchedule}
          onFinish={handleTourScheduleSubmit}
        >
          <Form.Item
            label="Tên lịch trình"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên lịch trình",
              },
              {
                max: 255,
                message: "Tên lịch trình tối đa 255 ký tự",
              },
            ]}
          >
            <Input width={"100%"} />
          </Form.Item>
          <Form.Item
            label="Ngày khởi hành"
            name="departureDate"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày khởi hành",
              },
            ]}
          >
            <DatePicker
              disabledDate={disablePastDates}
              disabled={itemSelected ? true : false}
            />
          </Form.Item>

          <Form.Item
            label="Giá người lớn"
            name="priceAdult"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá người lớn",
              },
              {
                pattern: /^\d+$/,
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá trẻ em"
            name="priceChild"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá trẻ em",
              },
              {
                pattern: /^\d+$/,
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Card
        loading={isLoading}
        title="Lịch tour"
        padding="1.25rem 1.25rem 0"
        style={{ marginTop: 16 }}
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
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          loading={isLoading}
          scroll={{ x: 800 }}
        ></Table>
      </Card>
    </>
  );
}

export default TourScheduleTable;
