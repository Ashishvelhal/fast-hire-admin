import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Descriptions,
  Input,
  Row,
  Col,
  Typography,
} from "antd";
import {
  getAllContactUs,
  deleteContactUs,
  getContactUsById,
} from "../ContactUs/ContactUs";

const { Search } = Input;
const { Text } = Typography;

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchEmail, setSearchEmail] = useState("");

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getAllContactUs();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      message.error("Failed to load contact records");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Handle Email Search
  const handleSearch = (value) => {
    setSearchEmail(value);
    if (value.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((item) =>
        item.email?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleView = async (id) => {
    try {
      const data = await getContactUsById(id);
      setSelectedContact(data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch contact details");
    }
  };

  const handleModalClose = () => {
    setSelectedContact(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6%",
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      width: "15%",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: "15%",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (message) => (
        <Text
          style={{ maxWidth: 200 }}
          ellipsis={{
            tooltip: message || "No remark",
            showTitle: false,
          }}
        >
          {message || "No remark"}
        </Text>

      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
        <Col>
          <div
            style={{
              border: "1px solid #1677ff",
              color: "#1677ff",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "4px 16px",
              display: "inline-block",
              fontSize: "14px",
            }}
          >
            Total : {filteredContacts.length}
          </div>
        </Col>
        <Col>
          <Search
            placeholder="Search by Email"
            allowClear
            value={searchEmail}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 250 }}
          />
        </Col>
      </Row>

      {/* Table Section */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredContacts}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredContacts.length,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} records`,
        }}
      />

      <Modal
        open={isModalVisible}
        title="Contact Details"
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedContact ? (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="ID">{selectedContact.id}</Descriptions.Item>
            <Descriptions.Item label="First Name">
              {selectedContact.firstname}
            </Descriptions.Item>
            <Descriptions.Item label="Last Name">
              {selectedContact.lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedContact.email}
            </Descriptions.Item>
            <Descriptions.Item label="Contact">
              {selectedContact.contact}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              {selectedContact.message}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default ContactUs;
