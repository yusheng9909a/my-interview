import React from 'react';
import styled from 'styled-components';
import { Flex, Space, Row, Col, Badge } from 'antd';
import { badgeMap } from '../../utils';
import demoImage from '../../asset/image/image.jpg';
import MsCardProps from './interface';
import { StarOutlined } from '@ant-design/icons';

const Card = styled.div`
    border: 1px solid #d6d6d6;
    padding: 14px 12px;
    color: #595959;
    .content {
        display: flex;
        height: 100%;
        line-height: 1;
        img {
            width: 58px;
            height: 58px;
            margin-right: 15px;
            align-self: center;
        }
        .title {
            font-weight: 600;
        }
    }
`;

const MsCard: React.FC<MsCardProps> = (props: MsCardProps) => {
    const { cardOptions } = props;
    return (
        <Row gutter={[32, 16]}>
            {cardOptions?.map((item: any) => (
                <Col key={item.guid} xl={6} lg={8} md={12} xs={24}>
                    <Card>
                        <div className='content'>
                            <img src={demoImage} alt='' />
                            <Space direction='vertical' style={{ width: '100%' }}>
                                <Flex justify='space-between'>
                                    <div className='title'>{`${item?.prjName}`}</div>
                                    <Badge
                                        text={badgeMap[item?.projectStatus]?.text}
                                        color={badgeMap[item?.projectStatus]?.color}
                                    ></Badge>
                                </Flex>
                                <div>{`项目经理：${item?.prjManager}`}</div>
                                <div>{`立项日期：${item?.prjStartDate}`}</div>
                                <div>
                                    <Flex justify='space-between'>
                                        <Space>
                                            <div>{`任务：${item?.taskCount}`}</div>
                                            <div>{`完成：${item?.taskDoneCount}`}</div>
                                            <div>{`进行：${item?.taskDoingCount}`}</div>
                                        </Space>
                                        <StarOutlined style={{ color: '#facc16', fill: '#facc16' }}></StarOutlined>
                                    </Flex>
                                </div>
                            </Space>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default MsCard;
