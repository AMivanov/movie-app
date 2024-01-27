// eslint-disable-next-line import/order
import React from 'react';
import { Input } from 'antd';

import './search-form.css'

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            // debouncedSearchTerm: '',
        };
    }

    // componentDidMount() {
    //     this.debouncedSearchTerm = this.debounce(this.updateDebouncedSearchTerm, 500);
    // }
    //
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.searchTerm !== this.state.searchTerm) {
    //         this.debouncedSearchTerm(this.state.searchTerm);
    //     }
    // }
    //
    // debounce(func, delay) {
    //     let debounceTimer;
    //     return function() {
    //         const context = this;
    //         const args = arguments;
    //         clearTimeout(debounceTimer);
    //         debounceTimer = setTimeout(() => func.apply(context, args), delay);
    //     };
    // }
    //
    // updateDebouncedSearchTerm = (searchTerm) => {
    //     this.setState({ debouncedSearchTerm: searchTerm });
    // };

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault()
        this.props.searchFilms(this.state.searchTerm)
        this.setState({
            searchTerm: '',
        })
    }

    render() {
        console.log(this.props)
        return (
            <form onSubmit={this.onSubmit}>
                <Input placeholder="Type to search..." onChange={this.handleSearchChange} value={this.state.searchTerm} classNames="test" />
            </form>
        )
    }
}