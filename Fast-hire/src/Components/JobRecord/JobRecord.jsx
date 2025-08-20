import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Input, Tag, Select } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const JobRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data - replace with API call
  useEffect(() => {
    setRecords([
      { 
        id: 1, 
        jobTitle: 'Frontend Developer', 
        candidate: 'John Doe',
        status: 'In Review',
        appliedDate: '2023-06-15',
        stage: 'Screening',
      },
      { 
        id: 2, 
        jobTitle: 'Backend Developer', 
        candidate: 'Jane Smith',
        status: 'Hired',
        appliedDate: '2023-06-10',
        stage: 'Offer Sent',
      },
    ]);
  }, []);

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Candidate',
      dataIndex: 'candidate',
      key: 'candidate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'Hired' ? 'green' : 
          status === 'In Review' ? 'blue' : 'default'
        }>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
    },
  ];

  return (
    <div className="job-record-container">
      <Card
        title="Job Application Records"
        extra={
          <Space>
            <Search
              placeholder="Search records..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 250 }}
            />
            <Select
              placeholder="Filter by status"
              allowClear
              style={{ width: 150 }}
            >
              <Option value="In Review">In Review</Option>
              <Option value="Hired">Hired</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
            <Button icon={<FilterOutlined />}>
              More Filters
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={records}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default JobRecord;
