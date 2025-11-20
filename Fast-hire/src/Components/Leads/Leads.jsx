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
import { getAllCustomPlan } from "../Leads/Leads"; 
const { Search } = Input;
const { Text } = Typography;

const Leads = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchEmail, setSearchEmail] = useState("");

  // Load all leads
  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await getAllCustomPlan();
      setPlans(data);
      setFilteredPlans(data);
    } catch (error) {
      message.error("Failed to load Custom Plan records");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // Handle Email Search
  const handleSearch = (value) => {
    setSearchEmail(value);

    if (value.trim() === "") {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter((item) =>
        item.email?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlans(filtered);
    }
  };

  // View single record in modal
  const handleView = async (id) => {
    try {
      const data = await getCustomPlanById(id);
      setSelectedPlan(data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch plan details");
    }
  };

  const handleModalClose = () => {
    setSelectedPlan(null);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Mobile No",
      dataIndex: "mobNo",
      key: "mobNo",
      width: "15%",
    },
    {
      title: "Job Openings",
      dataIndex: "numberOfJobOpenings",
      key: "numberOfJobOpenings",
      width: "10%",
    },
    {
      title: "Message",
      dataIndex: "additionalMessage",
      key: "additionalMessage",
      render: (msg) => (
        <Text
          style={{ maxWidth: 200 }}
          ellipsis={{
            tooltip: msg || "No message",
            showTitle: false,
          }}
        >
          {msg || "No message"}
        </Text>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header Row */}
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
            Total : {filteredPlans.length}
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

      {/* Table */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredPlans}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredPlans.length,
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

      {/* Modal View */}
      <Modal
        open={isModalVisible}
        title="Custom Plan Details"
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedPlan ? (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="ID">{selectedPlan.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{selectedPlan.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedPlan.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile No">{selectedPlan.mobNo}</Descriptions.Item>
            <Descriptions.Item label="Job Openings">
              {selectedPlan.numberOfJobOpenings}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              {selectedPlan.additionalMessage}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default Leads;
