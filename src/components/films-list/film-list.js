import React from 'react';

import Film from '../film';

import './film-list.css'

export default class FilmList extends React.Component {
    static defaultProps = {
        film: [],
    }

    render() {
        console.log(this.props.film)
        const { film } = this.props
        const elements = film.map((elem, index) => {
            if (index < 6) {
                return (
                    <li key={elem.id}>
                        <Film
                          key={elem.key}
                          img={elem.poster_path}
                          name={elem.original_title}
                          date={elem.release_date}
                          genres={elem.genre_ids}
                          description={elem.overview}
                          rating={elem.vote_average}
                        />
                    </li>
                )
            }
            return null
        })
        return <ul className="film-container">{elements}</ul>
    }
}