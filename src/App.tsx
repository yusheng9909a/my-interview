import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Table, Spin, Badge } from 'antd';
import styled from 'styled-components';
import { StarOutlined } from '@ant-design/icons';
import type { RadioChangeEvent, TableColumnsType } from 'antd';
import { getDemoData } from './api/demo';
import { GroupOption } from './components/MsRadio/interface';
import MsRadio from './components/MsRadio';
import MsCard from './components/MsCard';
import { badgeMap } from './utils';
interface AppProps {}

interface DataType {
    productCategory: string; //所属品类
    prjCategory: string; //项目类别
    guid: string; //项目编号
    prjName: string; //项目名称
    projectStatus: string; //项目状态
    prjManager: string; //项目经理
    prjStartDate: string; //项目计划时间
    prjEndDate: string; //项目计划时间
    department: string; //所属部门
    logo: string;
    taskCount: number;
    taskDoneCount: number;
    taskDoingCount: number;
}
const groupOptions: GroupOption[] = [
    {
        label: '卡片',
        value: 1
    },
    {
        label: '列表',
        value: 2
    }
];

let timer: any = null;

const AppWrapper = styled.div`
.ant-table-thead {
    th {
        background: #fff !important;
    }
    .ant-table-cell {
        &::before {
            width: 0px !important;
        }
    }
}
`;

const App: React.FC<AppProps> = (props: AppProps) => {
    const columns: TableColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'star',
            render: () => <StarOutlined style={{ color: '#facc16', fill: '#facc16' }}></StarOutlined>
        },
        {
            title: '所属品类',
            dataIndex: 'productCategory'
        },
        {
            title: '项目类别',
            dataIndex: 'prjCategory'
        },
        {
            title: '项目编号',
            dataIndex: 'guid'
        },
        {
            title: '项目名称',
            dataIndex: 'prjName'
        },
        {
            title: '项目状态',
            dataIndex: 'projectStatus',
            render: text => {
                const badgeOption: any = badgeMap[text] || {};
                return <Badge text={badgeOption.text} color={badgeOption.color}></Badge>;
            }
        },
        {
            title: '项目经理',
            dataIndex: 'prjManager'
        },
        {
            title: '所属部门',
            dataIndex: 'department'
        },
        {
            title: '项目计划时间',
            dataIndex: 'prjStartDate',
            render: (text: string, record: DataType) => `${record.prjStartDate} ~ ${record.prjEndDate}`
        }
    ];
    const [spinning, setSpinning] = useState<boolean>(true);
    const [value, setValue] = useState<any>(1);
    const [dataSource, setDataSource] = useState<any[]>([]);

    const onChange = useCallback(({ target: { value } }: RadioChangeEvent) => {
        setValue(Number(value));
    }, []);

   
    useEffect(() => {
        (async () => {
            if (!value) return;
            try {
                setSpinning(true);
                const { data } = await getDemoData(value);
                setDataSource(data);
            } finally {
                timer = setTimeout(() => {
                    setSpinning(false);
                }, 1500);
            }
        })();
        return () => {
            clearTimeout(timer);
        };
    }, [value]);
    return (
        <AppWrapper>
            <Flex vertical style={{ padding: '0px 18px 0px 12px' }}>
                <Spin spinning={spinning}>
                    <Flex justify='end' style={{ padding: '14px 0px' }}>
                        <MsRadio value={value} onChange={onChange} groupOptions={groupOptions}></MsRadio>
                    </Flex>
                    <Flex flex={1}>
                        {value === 2 ? (
                            <Table
                                rowKey={'guid'}
                                columns={columns}
                                dataSource={dataSource || []}
                                style={{ width: '100%', border: '1px solid #f0f0f0', borderRadius: '5px' }}
                            ></Table>
                        ) : (
                            <MsCard cardOptions={dataSource || []}></MsCard>
                        )}
                    </Flex>
                </Spin>
            </Flex>
        </AppWrapper>
    );
};

export default App;
