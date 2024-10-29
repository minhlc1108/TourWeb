import Card from "antd/es/card/Card";
import { Button, Flex, Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";

function Category() {
  const data = [
    {
      key: "1",
      id: "1",
      category: "John Brown",
      detail: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      id: "2",
      category: "Joe Black",
      detail: "London No. 1 Lake Park",
    },
    {
      key: "3",
      id: "3",
      category: "Jim Green",
      detail: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      id: "4",
      category: "Jim Red",
      detail: "London No. 2 Lake Park",
    },
    {
      key: "5",
      id: "5",
      category: "John Brown",
      detail: "New York No. 1 Lake Park",
    },
    {
      key: "6",
      id: "6",
      category: "Joe Black",
      detail: "London No. 1 Lake Park",
    },
    {
      key: "7",
      id: "7",
      category: "Jim Green",
      detail: "Sydney No. 1 Lake Park",
    },
    {
      key: "8",
      id: "8",
      category: "Jim Red",
      detail: "London No. 2 Lake Park",
    },
    {
      key: "9",
      id: "9",
      category: "John Brown",
      detail: "New York No. 1 Lake Park",
    },
    {
      key: "10",
      id: "10",
      category: "Joe Black",
      detail: "London No. 1 Lake Park",
    },
    {
      key: "11",
      id: "11",
      category: "Jim Green",
      detail: "Sydney No. 1 Lake Park",
    },
    {
      key: "12",
      id: "12",
      category: "Jim Red",
      detail: "London No. 2 Lake Park",
    },
  ];
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(searchedColumn)
    console.log(searchText)
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
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
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true
    },
    {
      title: "Tên danh mục",
      dataIndex: "category",
      key: "category",
      sorter: true,
      ...getColumnSearchProps('category'),
    },
    {
      title: "Mô tả",
      dataIndex: "detail",
      key: "detail",
      sorter: true,
      ...getColumnSearchProps('detail'),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: () => {
        return (
          <Space size="small">
            <Button
              variant="outlined"
              icon={<EditOutlined />}
            ></Button>
            <Button
              color="danger"
              variant="outlined"
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Card title="Danh mục" padding="1.25rem 1.25rem 0">
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
        >
          Thêm
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{pageSize: 5}}></Table>
    </Card>
  );
}

export default Category;
