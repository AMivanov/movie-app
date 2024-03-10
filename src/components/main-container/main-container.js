import React from 'react';
import { Pagination, Spin } from 'antd';

import SearchForm from '../search-form';
import FilmList from '../films-list';

import './main-container.css'

export default class MainContainer extends React.Component {
    render() {
        const { film, loading, currentPage, totalPages, searchTerm, searchFilms, guestSessionId, handleSearch, handlePageChange, tabKey } = this.props
        return (
        <>
            {tabKey === '1' && <SearchForm searchFilms={searchFilms} handleSearch={handleSearch} />}
            {loading ? (<Spin size="large" style={{ margin: '200px 0 0 0' }} />) : (
                <>
                    <FilmList
                      film={film}
                      searchTerm={searchTerm}
                      guestSessionId={guestSessionId}
                      handlePageChange={handlePageChange}
                      tabKey={tabKey}
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