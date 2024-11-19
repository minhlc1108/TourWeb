import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "~/components/EscapeAntd";
import { API_ROOT } from "~/utils/constants";
import { getTourByIdAPI, updateTourAPI } from "~/apis";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function EditTour() {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [tour, setTour] = useState({});
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const [formEditTour] = Form.useForm();
  const [formTourSchedule] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [itemSelected, setItemSelected] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const id = searchParams.get("id");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    // if (file.status === "done") {
    //   const updatedFileList = newFileList.map((file) => ({
    //     url: file.response?.secure_url || file.url,
    //   }));
    setFileList(newFileList);
    // } else setFileList(newFileList);
  };

  const handleSubmit = (values) => {
    updateTourAPI(id, {
      ...values,
      images: values.images?.fileList
        ? values.images?.fileList.map((file) => ({
            url: file.response?.secure_url || file.url,
            id: file.id,
          }))
        : values.images.map((file) => ({
            url: file.url,
            id: file.id,
          })),
    }).then((respone) => {
      console.log(respone);
      message.success("Sửa thành công!");
    });
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  useEffect(() => {
    setIsLoading(true);
    if (id == "") navigate("/admin/tour");
    getTourByIdAPI(id)
      .then((tour) => {
        setIsLoading(false);
        console.log(tour);
        setTour(tour);
        formEditTour.setFieldsValue(tour);
        setFileList(tour.images);
      })
      .catch(() => {
        navigate("/admin/tour");
      });
  }, [id, navigate]);

  const showModal = (record) => {
    if (record) {
      setTitle("Sửa lịch tour");
      setItemSelected(record);
      formTourSchedule.setFieldsValue({
        name: record.name,
        detail: record.detail,
      });
    } else {
      setItemSelected(null);
      setTitle("Thêm lịch tour");
    }
    setVisible(true);
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
    },
    {
      title: "Ngày khởi hành",
      dataIndex: "departure",
      key: "departure",
      sorter: true,
    },
    {
      title: "Ngày đến",
      dataIndex: "destination",
      key: "destination",
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
              // onClick={() => showModal(record)}
            ></Button>
            <Button
              // onClick={() => deleteItem(record.id)}
              color="danger"
              variant="outlined"
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const disablePastDates = (current) => {
    const today = new Date(); // Lấy ngày hôm nay
    today.setHours(0, 0, 0, 0); // Đặt thời gian là 0:00:00 để so sánh chính xác
    return current && current < today; // Vô hiệu hóa các ngày trước hôm nay
  };

  const handleTourScheduleSubmit = () => {};

  const handleCancel = () => {
    setVisible(false);
    setItemSelected(null);
    formTourSchedule.resetFields();
  };

  return (
    <>
      <Card
        loading={isLoading}
        title="Thông tin tour"
        extra={
          <Button
            color="primary"
            variant="solid"
            icon={<LeftOutlined />}
            iconPosition={"start"}
            onClick={() => {
              navigate("/admin/tour");
            }}
          >
            Quay lại
          </Button>
        }
        padding="1.25rem 1.25rem 0"
      >
        <Form
          name="basic"
          labelCol={{
            span: 3,
          }}
          form={formEditTour}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên tour"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên tour không được để trống!",
              },
              {
                max: 255,
                message: "Tên tour không vượt quá 255 ký tự!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="detail">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Điểm khởi hành"
            name="departure"
            rules={[
              {
                required: true,
                message: "Điểm khởi hành không được để trống!",
              },
              {
                max: 255,
                message: "Điểm khởi hành không vượt quá 255 ký tự!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Điểm đến"
            name="destination"
            rules={[
              {
                required: true,
                message: "Điểm đến không được để trống!",
              },
              {
                max: 255,
                message: "Điểm đến không vượt quá 255 ký tự!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Số lượng không được để trống!",
              },
              {
                pattern: /^\d+$/,
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input addonAfter="người" />
          </Form.Item>
          <Form.Item
            label="Thời lượng"
            name="duration"
            rules={[
              {
                required: true,
                message: "Thời lượng không được để trống!",
              },
              {
                pattern: /^\d+$/,
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input addonAfter="ngày" />
          </Form.Item>
          <Form.Item label="Danh mục" name="categoryId">
            <Select
              showSearch
              placeholder="Chọn danh mục"
              disabled={true}
              options={[
                {
                  key: tour?.categoryId,
                  value: tour?.categoryId,
                  label: `${tour?.categoryId} - ${tour?.categoryName}`,
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            name="images"
            label="Ảnh"
            rules={[
              {
                validator: () => {
                  if (!fileList || fileList.length === 0) {
                    return Promise.reject("Vui lòng tải lên ít nhất một ảnh!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload
              accept=".png, .jpg, .jfif"
              action={`${API_ROOT}/tour-image/upload`}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              loading={isSubmitting}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        open={visible}
        onOk={formTourSchedule.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        title={title}
      >
        <Form
          name="basic"
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
                max: 255,
                message: "Tên lịch trình tối đa 255 ký tự",
              },
            ]}
          >
            <Input width={"100%"} />
          </Form.Item>
          <Form.Item
            label="Ngày khởi hành"
            name="departure"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày khởi hành",
              },
            ]}
          >
            <DatePicker disabledDate={disablePastDates} />
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
            <Input/>
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
          // dataSource={data}
          // pagination={pagination}
          // onChange={handleTableChange}
          // loading={isLoading}
          scroll={{ x: 800 }}
        ></Table>
      </Card>
    </>
  );
}

export default EditTour;
