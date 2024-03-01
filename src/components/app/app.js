import React from 'react';
import { Alert, Space } from 'antd';
import { Online, Offline } from 'react-detect-offline';
import { debounce } from 'lodash';

import HeaderTabs from '../header-tabs';
import MovieService from '../../services/movie-service';
import GenreService from '../../services/genre-service';
import { GenreServiceProvider } from '../genre-service-context';
import GuestSession from '../../services/guest-session';

import './app.css'

export default class App extends React.Component {
    state = {
        film: [],
        searchTerm: '',
        loading: false,
        currentPage: 1,
        totalPages: 0,
        guestSessionId: '',
    }

    componentDidMount() {
        GenreService().then((genresObj) => {
            this.setState({ genresObj })
        })
        GuestSession().then((guestSessionId) => {
            this.setState({ guestSessionId })
        })
    }

    searchFilms = (text) => {
        this.setState({
            searchTerm: text,
            loading: true,
        }, () => {
            MovieService(this.state.searchTerm, this.state.currentPage).then((res) => {
                // console.log(res)
                this.setState({
                    film: res.results,
                    totalPages: res.total_pages,
                    loading: false,
                })
            })
        })
    }

   handleSearch = (e) => {
       this.setState({
           loading: true,
       })
       const debSearch = debounce(() => this.searchFilms(e.target.value), 400);
       debSearch();
   }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page,
        });
        this.searchFilms(this.state.searchTerm);
    };

    render() {
        // console.log(this.state.film)
        const { film, loading, currentPage, totalPages, searchTerm, genresObj, guestSessionId } = this.state
        // console.log(genresObj)
        return (
            <GenreServiceProvider value={genresObj}>
            <>
                <Online>
                    <section className="container">
                        <HeaderTabs
                          guestSessionId={guestSessionId}
                          film={film}
                          loading={loading}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          searchTerm={searchTerm}
                          searchFilms={this.searchFilms}
                          handleSearch={this.handleSearch}
                          handlePageChange={this.handlePageChange}
                        />
                    </section>
                </Online>
                <Offline>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert
                          message="Отсутствует соединение"
                          type="error"
                        />
                    </Space>
                </Offline>
            </>
            </GenreServiceProvider>
        )
    }
}
