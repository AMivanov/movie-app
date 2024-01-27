// eslint-disable-next-line import/order
import React from 'react';
import { Tabs } from 'antd';

import './header-tabs.css'

export default class HeaderTabs extends React.Component {
    render() {
        const onChangeTabs = (key) => {
            console.log(key);
        };

        const optionsList = [
            {
                key: '1',
                label: 'Search',
                children: <div>'Content of Tab Pane 1'</div>,
            },
            {
                key: '2',
                label: 'Rated',
                children: <div>'Content of Tab Pane 2'</div>,
            },
        ];
        return (
            <section className="header">
                <Tabs defaultActiveKey="1" items={optionsList} onChange={onChangeTabs} />
            </section>
        )
    }
}
