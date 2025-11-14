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
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
} from "../DegreeLeads/DegreeLeads";

const { Search } = Input;
const { Text } = Typography;

const DegreeLeads = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchEmail, setSearchEmail] = useState("");

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getAllEnquiries();
      setEnquiries(data);
      setFilteredEnquiries(data);
    } catch (error) {
      message.error("Failed to load enquiries");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleSearch = (value) => {
    setSearchEmail(value);
    if (value.trim() === "") {
      setFilteredEnquiries(enquiries);
    } else {
      const filtered = enquiries.filter((item) =>
        item.email?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEnquiries(filtered);
    }
  };

  const handleView = async (eid) => {
    try {
      const data = await getEnquiryById(eid);
      setSelectedEnquiry(data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch enquiry details");
    }
  };

  const handleDelete = async (eid) => {
    Modal.confirm({
      title: "Are you sure you want to delete this enquiry?",
      onOk: async () => {
        try {
          await deleteEnquiry(eid);
          message.success("Enquiry deleted successfully");
          loadEnquiries();
        } catch (error) {
          message.error("Failed to delete enquiry");
        }
      },
    });
  };

  const handleModalClose = () => {
    setSelectedEnquiry(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "eid",
      key: "eid",
      width: "6%",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNO",
      key: "mobileNO",
      width: "15%",
    },
    {
      title: "Interested Course",
      dataIndex: "interestedCourse",
      key: "interestedCourse",
      render: (course) => (
        <Text
          style={{ maxWidth: 200 }}
          ellipsis={{
            tooltip: course || "No course mentioned",
            showTitle: false,
          }}
        >
          {course || "No course mentioned"}
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
            Total : {filteredEnquiries.length}
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
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredEnquiries}
        rowKey="eid"
        bordered
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 25,
          total: filteredEnquiries.length,
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
        title="Enquiry Details"
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedEnquiry ? (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="ID">{selectedEnquiry.eid}</Descriptions.Item>
            <Descriptions.Item label="Name">{selectedEnquiry.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedEnquiry.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile No">
              {selectedEnquiry.mobileNO}
            </Descriptions.Item>
            <Descriptions.Item label="Interested Course">
              {selectedEnquiry.interestedCourse}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default DegreeLeads;
