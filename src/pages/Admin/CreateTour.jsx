import { Button, Card, Form, Image, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createNewTourAPI, fetchAllCategoryAPI } from "~/apis";
import { API_ROOT } from "~/utils/constants";
import { message } from "~/components/EscapeAntd";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function CreateTour() {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [categories, SetCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
    fetchAllCategoryAPI().then((data) => {
      SetCategories(data.categories);
    });
  }, []);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const createdTour = await createNewTourAPI({
      ...values,
      images: values.images?.fileList.map((file) => ({
        url: file.response?.secure_url || file.url,
      })),
    });
    if (createdTour) {
      message.success("Thêm tour thành công!");
      navigate(`/admin/tour/edit?id=${createdTour.id}`);
    }
    setIsSubmitting(false);
  };

  return (
    <Card
      title="Thêm tour"
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
        onFinish={handleSubmit}
        form={form}
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
        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn danh mục"
            options={categories.map((c) => ({
              key: c.id,
              value: c.id,
              label: `${c.id} - ${c.name}`,
            }))}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
          >
            {/* {categories &&
               categories.map((c) => {
                return (
                  <Select.Option key={c.id} value={c.id}>
                    {c.name}
                  </Select.Option>
                ); */}
            {/* })} */}
          </Select>
        </Form.Item>
        <Form.Item
          name="images"
          label="Ảnh"
          rules={[
            {
              validator: () => {
                // Kiểm tra xem có ảnh trong fileList hay không
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CreateTour;
