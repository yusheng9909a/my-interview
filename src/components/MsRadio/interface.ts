import type { RadioGroupProps } from 'antd';

export interface GroupOption {
    label: string;
    value: any;
}

export default interface MsRadioGroupProps extends RadioGroupProps {
    groupOptions: GroupOption[]
}