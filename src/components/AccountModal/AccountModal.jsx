import React from "react";
import { Modal, Descriptions, Spin } from "antd";
import dayjs from "dayjs";

const AccountDetailsModal = ({
    isVisible,
    loading,
    accountDetails,
    customerDetails,
    onClose,
}) => {
    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width={800} // Tăng chiều rộng modal để hiển thị đẹp hơn
        >
            {loading ? (
                <Spin size="large" style={{ display: "flex", justifyContent: "center", margin: "20px 0" }} />
            ) : (
                accountDetails &&
                customerDetails && (
                    <div>
                        {/* Thông tin tài khoản */}
                        <Descriptions
                            title="Account Information"
                            bordered
                            column={2} // Hiển thị theo 2 cột
                            size="middle"
                            style={{ marginBottom: "20px" }} // Tạo khoảng cách giữa các nhóm thông tin
                        >
                            <Descriptions.Item label="User Name">{accountDetails.userName}</Descriptions.Item>
                            <Descriptions.Item label="Email">{accountDetails.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{accountDetails.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Role">{accountDetails.role ? "Admin" : "User"}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {accountDetails.lockoutEnabled ? "Locked" : "Active"}
                            </Descriptions.Item>
                        </Descriptions>

                        {/* Thông tin khách hàng */}
                        <Descriptions
                            title="Customer Information"
                            bordered
                            column={2} // Hiển thị theo 2 cột
                            size="middle"
                        >
                            <Descriptions.Item label="Customer Name">{customerDetails.name}</Descriptions.Item>
                            <Descriptions.Item label="Gender">
                                {customerDetails.sex === 1
                                    ? "Male"
                                    : customerDetails.sex === 0
                                        ? "Female"
                                        : "N/A"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">{customerDetails.address}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">
                                {customerDetails.birthday ? dayjs(customerDetails.birthday).format("YYYY-MM-DD") : "N/A"}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )
            )}
        </Modal>
    );
};

export default AccountDetailsModal;
