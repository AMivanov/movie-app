import React from 'react';
import { Pagination, Spin } from 'antd';

import SearchForm from '../search-form';
import FilmList from '../films-list';

import './main-container.css'

export default class MainContainer extends React.Component {
    render() {
        const { film, loading, currentPage, totalPages, searchTerm, searchFilms, guestSessionId, handleSearch, handlePageChange, ratedFilms } = this.props
        return (
        <>
            <SearchForm searchFilms={searchFilms} handleSearch={handleSearch} />
            {loading ? (<Spin size="large" style={{ margin: '200px 0 0 0' }} />) : (
                <>
                    <FilmList
                      ratedFilms={ratedFilms}
                      film={film}
                      // loading={loading}
                      searchTerm={searchTerm}
                      guestSessionId={guestSessionId}
                    />
                    {totalPages > 1 && (
                        <Pagination
                          defaultCurrent={currentPage}
                          total={totalPages}
                          defaultPageSize={1}
                          onChange={(currentPage) => {
                              handlePageChange(currentPage)
                              window.scrollTo(0, 0)
                          }}
                        />
                    )}
                </>
            )}
        </>
        )
    }
}