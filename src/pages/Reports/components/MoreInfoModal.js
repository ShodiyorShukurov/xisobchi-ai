'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Card, List } from 'antd';
import Api from '../../../api';

const MoreInfoModal = ({
  isModalReportInfo,
  setIsModalReportInfo,
  selectedReport,
  setSelectedReport,
}) => {
  const [reportData, setReportData] = useState([]);
  const scrollPositionRef = useRef(0); // Joriy scroll pozitsiyasini saqlash

  const fetchReportData = async () => {
    if (!selectedReport) return;
    try {
      const res = await Api.get('/report/' + selectedReport);
      if (res.data) {
        setReportData([res.data.data]);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
      setReportData([]);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedReport]);

  useEffect(() => {
    if (isModalReportInfo) {
      // Joriy scroll pozitsiyasini saqlash
      scrollPositionRef.current = window.scrollY;
      console.log('Modal opened, saved scroll:', scrollPositionRef.current);
      // Sahifani fixed holatga o‘tkazish
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Modal yopilganda scrollni qayta tiklash
      const scrollY = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      console.log('Modal closed, restored scroll:', scrollY);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isModalReportInfo]);

  const handleCancel = () => {
    setIsModalReportInfo(false);
    setSelectedReport(null);
    setReportData([]);
  };

  return (
    <Modal
      title="Report Info"
      open={isModalReportInfo}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      centered
      maskClosable={true}
      autoFocusButton={null} // Avtomatik fokusni o‘chirish
      focusTriggerAfterClose={false} // Yopilganda fokusni qaytarmaslik
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
      style={{
        zIndex: 10000,
      }}
    >
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Report Info"
            >
              <div className="table-responsive">
                <List
                  style={{
                    border: 'none',
                  }}
                  size="small"
                  bordered
                  dataSource={reportData}
                  renderItem={(item) => (
                    <>
                      <List.Item>Id: {item.id}</List.Item>
                      <List.Item>User ID: {item.user_id}</List.Item>
                      <List.Item>Category ID: {item.category_id}</List.Item>
                      <List.Item>Category Name: {item.category_name}</List.Item>
                      <List.Item>Amount: {item.amount}</List.Item>
                      <List.Item>Currency: {item.currency}</List.Item>
                      <List.Item>
                        Income:{' '}
                        {item.income ? (
                          <span style={{ color: 'green' }}>True</span>
                        ) : (
                          <span style={{ color: 'red' }}>False</span>
                        )}
                      </List.Item>
                      <List.Item>Comment: {item.comment}</List.Item>
                      <List.Item>Date: {item.date?.slice(0, 19)}</List.Item>
                    </>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default MoreInfoModal;