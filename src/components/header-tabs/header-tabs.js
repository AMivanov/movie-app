import React from 'react';
import { Tabs } from 'antd';

import './header-tabs.css'
import { GetRating } from '../../services/rating-service';
import MainContainer from '../main-container';

export default class HeaderTabs extends React.Component {
    state = {
        ratedFilms: [],
        currentPageRated: 1,
        totalRatedPages: 0,
        // totalRatedItems: 0,
    }

    onChangeTabs = (key) => {
        // console.log(key)
        if (key === '2') {
                GetRating(this.props.guestSessionId, this.state.currentPageRated).then((res) => {
                    // console.log(res)
                    this.setState({
                        ratedFilms: res.results,
                        totalRatedPages: res.total_pages,
                        // totalRatedItems: res.total_results,
                    })
                })
        }
    }

    handlePageChangeRated = (page) => {
        this.setState({ currentPageRated: page });
        GetRating(this.props.guestSessionId, page).then((res) => {
            this.setState({
                ratedFilms: res.results,
                totalRatedPages: res.total_pages,
                // totalRatedItems: res.total_results,
            });
        });
    }

    render() {
        // console.log(this.state)
        console.log('rated', this.state.ratedFilms)
        const { guestSessionId, film, loading, currentPage, totalPages, searchTerm, searchFilms, handleSearch, handlePageChange } = this.props
        const optionsList = [
            {
                key: '1',
                label: 'Search',
                children: (
                    <MainContainer
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
                    <MainContainer
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
                ),
            },
        ];
        return (
            // <section className="header">
                <Tabs
                  // tabBarStyle={{ width: 'fit-content', margin: '0 auto 16px' }}
                  // centered
                  // style={{ width: '100%', height: '100%' }}
                  // destroyInactiveTabPane
                  defaultActiveKey="1"
                  items={optionsList}
                  onChange={this.onChangeTabs}
                  tabBarStyle={{ fontFamily: 'Inter, sans-serif', margin: '0 auto 16px' }}
                  tabBarGutter={16}
                />
            // {/*</section>*/}
        )
    }
}
