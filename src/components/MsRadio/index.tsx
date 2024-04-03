import React, { forwardRef } from 'react';

import MsRadioGroupProps from './interface';
import { GroupOption } from './interface';
import { Radio } from 'antd';

const MsRadio: React.FC<MsRadioGroupProps> = forwardRef((props: MsRadioGroupProps, ref) => {
    const { groupOptions } = props;
    return (
        <Radio.Group {...props}>
            {groupOptions?.map((item: GroupOption) => (
                <Radio.Button value={item?.value} key={item?.value}>
                    {item?.label}
                </Radio.Button>
            ))}
        </Radio.Group>
    );
});

export default MsRadio;
