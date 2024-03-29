import React from 'react';
import { Spin, Tabs } from 'antd';

import './header-tabs.css'
import { GetRating } from '../../services/rating-service';
import MainContainer from '../main-container';

export default class HeaderTabs extends React.Component {
    state = {
        ratedFilms: [],
        loading: false,
        currentPageRated: 1,
        totalRatedPages: 0,
    }

    onChangeTabs = (key) => {
        if (key === '2') {
            this.setState({
                loading: true,
            })
            GetRating(this.props.guestSessionId, this.state.currentPageRated)
                .then((res) => {
                    if (res.success === false) {
                        throw new Error('Server returned false')
                    }
                    this.setState({
                        loading: false,
                        ratedFilms: res.results,
                        totalRatedPages: res.total_pages,
                    })
                })
                .catch((error) => {
                    console.error(error);
                })
        } else if (key === '1') {
            GetRating(this.props.guestSessionId, this.state.currentPageRated)
                .then((res) => {
                    if (res.success === false) {
                        throw new Error('Server returned false')
                    }
                    this.setState({
                        ratedFilms: res.results,
                        totalRatedPages: res.total_pages,
                    })
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    handlePageChangeRated = (page) => {
        this.setState({ currentPageRated: page })
        GetRating(this.props.guestSessionId, page).then((res) => {
            this.setState({
                ratedFilms: res.results,
                totalRatedPages: res.total_pages,
            })
        })
    }

    render() {
        const {
            guestSessionId, film, loading,
            currentPage, totalPages, searchTerm,
            searchFilms, handleSearch, handlePageChange,
        } = this.props
        const optionsList = [
            {
                key: '1',
                label: 'Search',
                children: (
                    <MainContainer
                      tabKey="1"
                      guestSessionId={guestSessionId}
                      ratedFilms={this.state.ratedFilms}
                      film={film}
                      loading={loading}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      searchTerm={searchTerm}
                      searchFilms={searchFilms}
                      handleSearch={handleSearch}
                      handlePageChange={handlePageChange}
                    />
                ),
            },
            {
                key: '2',
                label: 'Rated',
                children: (
                    this.state.loading ? (
                        <Spin />
                    ) : (
                        <MainContainer
                          tabKey="2"
                          guestSessionId={guestSessionId}
                          ratedFilms={this.state.ratedFilms}
                          film={film}
                          loading={loading}
                          currentPage={this.state.currentPageRated}
                          totalPages={this.state.totalRatedPages}
                          searchTerm={searchTerm}
                          searchFilms={searchFilms}
                          handleSearch={handleSearch}
                          handlePageChange={this.handlePageChangeRated}
                        />
                    )
                ),
            },
        ];
        return (
            <Tabs
              defaultActiveKey="1"
              items={optionsList}
              onChange={this.onChangeTabs}
              tabBarStyle={{ fontFamily: 'Inter, sans-serif', margin: '0 auto 16px' }}
              tabBarGutter={16}
            />
        )
    }
}
