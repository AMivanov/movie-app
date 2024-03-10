import React from 'react';
import { Tabs } from 'antd';

import './header-tabs.css'
import MainContainer from '../main-container';

export default class HeaderTabs extends React.Component {
    state = {
        ratedFilms: [],
        currentPageRated: 1,
        totalRatedPages: 0,
    }

    componentDidMount() {
        this.loadRatedFilms();
    }

    loadRatedFilms = () => {
        const ratedFilms = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('film-')) {
                const filmData = JSON.parse(localStorage.getItem(key));
                ratedFilms.push(filmData);
            }
        }
        const totalRatedPages = Math.ceil(ratedFilms.length / 20)
        this.setState({ ratedFilms, totalRatedPages })
    }

    onChangeTabs = (key) => {
        if (key === '2') {
            this.loadRatedFilms()
        } else {
            this.setState({ ratedFilms: [], currentPageRated: 1 })
        }
    }

    handlePageChangeRated = (page) => {
        this.setState({ currentPageRated: page });
    }

    render() {
        const { guestSessionId, film, loading, currentPage, totalPages, searchTerm, searchFilms, handleSearch, handlePageChange } = this.props
        const optionsList = [
            {
                key: '1',
                label: 'Search',
                children: (
                    <MainContainer
                      tabKey="1"
                      guestSessionId={guestSessionId}
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
                    <MainContainer
                      tabKey="2"
                      guestSessionId={guestSessionId}
                      film={this.state.ratedFilms.slice((this.state.currentPageRated - 1) * 20, this.state.currentPageRated * 20)}
                      loading={loading}
                      currentPage={this.state.currentPageRated}
                      totalPages={this.state.totalRatedPages}
                      searchTerm={searchTerm}
                      searchFilms={searchFilms}
                      handleSearch={handleSearch}
                      handlePageChange={this.handlePageChangeRated}
                    />
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
