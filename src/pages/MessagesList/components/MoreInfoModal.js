'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Card, List, Image } from 'antd';
import Api from '../../../api';
import DOMPurify from 'dompurify';

const MoreInfoModal = ({ moreInfoModal, handleMoreInfoCancel, moreInfoId }) => {
  const [messageData, setMessageData] = useState([]);
  const scrollPositionRef = useRef(0);

  const fetchDebtData = async () => {
    if (!moreInfoId) return;
    try {
      const res = await Api.get('/message/' + moreInfoId);
      if (res.data) {
        setMessageData([res.data.data]);
      } else {
        setMessageData([]);
      }
    } catch (error) {
      console.error('Error fetching debt data:', error);
      setMessageData([]);
    }
  };

  useEffect(() => {
    fetchDebtData();
  }, [moreInfoId]);

  useEffect(() => {
    if (moreInfoModal) {
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
  }, [moreInfoModal]);

  return (
    <Modal
      title="Debt Info"
      open={moreInfoModal}
      onCancel={() => {
        handleMoreInfoCancel();
        setMessageData([]);
      }}
      footer={null}
      width={1200}
      centered
      maskClosable={true}
      autoFocusButton={null}
      focusTriggerAfterClose={false}
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
              title="Message Info"
            >
              <div className="table-responsive">
                <List
                  style={{
                    border: 'none',
                  }}
                  size="small"
                  bordered
                  dataSource={messageData}
                  renderItem={(item) => (
                    <>
                      <List.Item>
                        Id: <span>{item.id}</span>
                      </List.Item>
                      <List.Item>
                        Text:{' '}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.text),
                          }}
                        />
                      </List.Item>
                      <List.Item>
                        Premium:{' '}
                        <span style={{ color: item.premium ? 'green' : 'red' }}>
                          {item.premium ? 'True' : 'False'}
                        </span>
                      </List.Item>
                      <List.Item>
                        Bot_lang: <span>{item.bot_lang}</span>
                      </List.Item>
                      <List.Item>
                        File:{' '}
                        {item?.file ? (
                          <Image
                            src={item.file}
                            alt="File"
                            style={{
                              maxWidth: '100px',
                              maxHeight: '100px',
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              e.target.src =
                                'https://via.placeholder.com/100?text=No+Image';
                            }}
                          />
                        ) : (
                          <span>Rasm yo‘q</span>
                        )}
                      </List.Item>
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
