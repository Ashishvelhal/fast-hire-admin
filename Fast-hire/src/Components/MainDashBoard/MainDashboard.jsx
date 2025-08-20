import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, FileDoneOutlined, CheckCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const navigate = useNavigate();
  
  // Sample statistics data
  const stats = [
    { title: 'Total Jobs', value: 126, icon: <FileDoneOutlined />, color: '#1890ff' },
    { title: 'Active Applications', value: 89, icon: <CheckCircleOutlined />, color: '#52c41a' },
    { title: 'New Candidates', value: 24, icon: <UserOutlined />, color: '#faad14' },
    { title: 'Total Hired', value: 45, icon: <TeamOutlined />, color: '#722ed1' },
  ];

  return (
    <div className="main-dashboard">
      <h2>Dashboard Overview</h2>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card title="Recent Activities" style={{ height: '100%' }}>
            <p>No recent activities to display</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Quick Actions" style={{ height: '100%' }}>
            <div className="quick-actions">
              <p onClick={() => navigate('/fasthireadmin/admin/createjobpost')} style={{ cursor: 'pointer' }}>
                ➕ Create New Job Post
              </p>
              <p onClick={() => navigate('/fasthireadmin/admin/applicationform')} style={{ cursor: 'pointer' }}>
                📝 New Application
              </p>
              <p onClick={() => navigate('/fasthireadmin/admin/jobrecord')} style={{ cursor: 'pointer' }}>
                📊 View Job Records
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MainDashboard;
