import React, { useRef, useEffect } from 'react';
import { Button, Image, Table } from 'antd';
import { data } from '../../../mock/data';
import { useMain } from '../../../hooks/UseMain';

const ReportsData = ({ message, handleDeleteModal, showMoreInfoModal }) => {
  const { changeValue } = useMain();
  const scrollRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const dataIndex =
    message?.length > 0
      ? message.map((message, index) => ({
          id: index + 1,
          text: message?.text,
          premium: message?.premium,
          bot_lang: message?.bot_lang,
          file: message.file ? (
            <Image src={message?.file} />
          ) : (
            <span>File not found</span>
          ),
          sent_count: message?.sent_count,
          message_id: message.id,
        }))
      : [];

  useEffect(() => {
    const tableBody = scrollRef.current?.querySelector('.ant-table-body');
    if (tableBody) {
      const handleScroll = () => {
        scrollPositionRef.current = tableBody.scrollTop;
      };
      tableBody.addEventListener('scroll', handleScroll);
      return () => tableBody.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const columns = [
    {
      title: data[changeValue].users_list.id,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
      align: 'center',
      render: (text) => (
        <span>
          {text?.length > 10 ? (
            <span style={{ textTransform: 'capitalize' }}>
              {text?.slice(0, 10)}...
            </span>
          ) : (
            <span style={{ textTransform: 'capitalize' }}>{text}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
      align: 'center',
      render: (premium) => (
        <span>
          {premium ? (
            <span style={{ color: 'green' }}>True</span>
          ) : (
            <span style={{ color: 'red' }}>False</span>
          )}
        </span>
      ),
    },
    {
      title: 'Bot Language',
      dataIndex: 'bot_lang',
      key: 'bot_lang',
      align: 'center',
      render: (bot_lang) => (
        <span>
          {bot_lang?.length > 10 ? (
            <span style={{ textTransform: 'capitalize' }}>
              {bot_lang?.slice(0, 10)}...
            </span>
          ) : (
            <span style={{ textTransform: 'capitalize' }}>{bot_lang}</span>
          )}
        </span>
      ),
    },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      align: 'center',
    },
    {
      title: 'Sent Count',
      dataIndex: 'sent_count',
      key: 'sent_count',
      align: 'center',
      render: (sent_count) => (
        <span>
          {sent_count ? (
            <span style={{ color: 'green' }}>{sent_count}</span>
          ) : (
            <span style={{ color: 'red' }}>Not Sent</span>
          )}
        </span>
      ),
    },
    {
      title: data[changeValue].users_list.actions,
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              const tableBody =
                scrollRef.current?.querySelector('.ant-table-body');
              if (tableBody) {
                scrollPositionRef.current = tableBody.scrollTop;
              }
              showMoreInfoModal(record.message_id);
            }}
            style={{ paddingLeft: '10px', paddingRight: '10px' }}
          >
            <svg
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              <path
                fillRule="evenodd"
                d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button
            type="link"
            onClick={() => handleDeleteModal(record.message_id)}
          >
            <svg
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <div ref={scrollRef}>
      <Table
        columns={columns}
        dataSource={dataIndex}
        pagination={false}
        className="ant-border-space"
        scroll={{ y: 600 }}
      />
    </div>
  );
};

export default ReportsData;
