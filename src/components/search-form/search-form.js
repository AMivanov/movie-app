import React from 'react';
import { Input } from 'antd';

import './search-form.css'

export default class extends React.Component {
    render() {
        const { handleSearch } = this.props
        return (
            <div className="search-form">
                <Input
                  placeholder="Type to search..."
                  onChange={handleSearch}
                  autoFocus
                />
            </div>
        );
    }
}