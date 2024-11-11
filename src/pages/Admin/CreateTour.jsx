import { Button, Card, Form, Image, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetchAllCategoryAPI } from "~/apis";

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
  const [fileList, setFileList] = useState([
    { 
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
          name="category"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục!",
            },
          ]}
        >
          <Select showSearch placeholder="Chọn danh mục">
            {categories &&
              categories.map((c) => {
                return (
                  <>
                    <Select.Option value={c.id}>{c.name}</Select.Option>;
                  </>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item label="Ảnh">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
          <Button type="primary" size="large">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CreateTour;
