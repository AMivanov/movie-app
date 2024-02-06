import React from 'react';
import { Alert, Pagination, Space, Spin } from 'antd';
import { Online, Offline } from 'react-detect-offline';
import { debounce } from 'lodash';

import SearchForm from '../search-form';
import HeaderTabs from '../header-tabs';
import MovieService from '../../services/movie-service';
import FilmList from '../films-list';
import GenreService from '../../services/genre-service';

import './app.css'

export default class App extends React.Component {
    state = {
        film: [],
        searchTerm: '',
        loading: false,
        currentPage: 1,
        totalPages: 0,
    }

    // genreFilms = () => new Promise((resolve, reject) => {
    //         GenreService().then((res) => {
    //             console.log('genres', res)
    //             resolve(res)
    //         }).catch(reject)
    //     })
    componentDidMount() {
        GenreService().then((genresObj) => {
            this.setState({ genresObj })
        })
    }

    searchFilms = (text) => {
        this.setState({
            searchTerm: text,
            loading: true,
        }, () => {
            MovieService(this.state.searchTerm, this.state.currentPage).then((res) => {
                console.log(res)
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
        // this.genreFilms().then((genres) => {
        //     console.log(genres)
        // }).catch((error) => {
        //     console.error(error)
        // })
        const { film, loading, currentPage, totalPages, searchTerm, genresObj } = this.state
        console.log(genresObj)
        return (
            <>
                <Online>
                    <section className="container">
                        <HeaderTabs />
                        <SearchForm searchFilms={this.searchFilms} handleSearch={this.handleSearch} />
                         {loading ? (<Spin size="large" style={{ margin: '200px 0 0 0' }} />) : (
                            <>
                                <FilmList
                                  film={film}
                                  loading={loading}
                                  searchTerm={searchTerm}
                                  genresObj={genresObj}
                                />
                                {totalPages > 1 && (
                                    <Pagination
                                      defaultCurrent={currentPage}
                                      total={totalPages}
                                      defaultPageSize={1}
                                      onChange={this.handlePageChange}
                                    />
                                )}
                            </>
                         )}
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
        )
    }
}
