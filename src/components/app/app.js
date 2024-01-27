import React from 'react';
import { Alert, Pagination, Space, Spin } from 'antd';
import { Online, Offline } from 'react-detect-offline';

import SearchForm from '../search-form';
import HeaderTabs from '../header-tabs';
import MovieService from '../../services/movie-service';
import FilmList from '../films-list';

import './app.css'

export default class App extends React.Component {
    state = {
        film: [],
        searchTerm: 'spider man',
        loading: true,
    }

    searchFilms = (text) => {
        this.setState(() => ({
            searchTerm: text,
            }))
        MovieService(this.state.searchTerm).then((res) => {
            this.setState({
                film: res.results,
                loading: false,
            })
        })
    }

    componentDidMount() {
        MovieService(this.state.searchTerm).then((res) => {
            this.setState({
                film: res.results,
                loading: false,
            })
        })
    }

    render() {
        const { film, loading } = this.state
        return (
            <>
                <Online>
                    <section className="container">
                        <HeaderTabs />
                        <SearchForm searchFilms={this.searchFilms} />
                        {loading ? (<Spin size="large" style={{ margin: '200px 0 0 0' }} />) : (
                            <>
                                <FilmList film={film} />
                                <Pagination defaultCurrent={1} total={50} />
                            </>
                        )}
                    </section>
                </Online>
                <Offline>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert
                          message="Инет кончился"
                          type="error"
                        />
                    </Space>
                </Offline>
            </>
        )
    }
}
