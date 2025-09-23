import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Input, Select, Modal, Form, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Sample data - replace with API call
  useEffect(() => {
    setJobs([
      { id: 1, title: 'Frontend Developer', department: 'Engineering', location: 'Remote', status: 'Active' },
      { id: 2, title: 'Backend Developer', department: 'Engineering', location: 'New York', status: 'Active' },
      { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco', status: 'Inactive' },
    ]);
  }, []);

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const handleAddNew = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this job post?',
      onOk: () => {
        // Add delete logic here
        message.success('Job post deleted successfully');
      },
    });
  };

  const handleSubmit = (values) => {
    // Add save/update logic here
    message.success('Job post saved successfully');
    setIsModalVisible(false);
  };

  return (
    <div className="job-post-container">
      <Card
        title="Job Posts"
        // extra={
        //   <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
        //     Add New Job
        //   </Button>
        // }
      >
        <div className="job-post-filters">
          <Search
            placeholder="Search jobs..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300, marginBottom: 16 }}
          />
          <Select
            placeholder="Filter by status"
            allowClear
            style={{ width: 200, marginLeft: 16 }}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={jobs}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Add New Job Post"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: 'Active' }}
        >
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please enter job title' }]}
          >
            <Input placeholder="e.g., Senior Frontend Developer" />
          </Form.Item>
          
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select department">
              <Option value="Engineering">Engineering</Option>
              <Option value="Design">Design</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="HR">HR</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="e.g., Remote, New York, etc." />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Job Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobPost;
