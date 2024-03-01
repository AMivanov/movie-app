import React from 'react';

import Film from '../film';

import './film-list.css'

export default class FilmList extends React.Component {
    static defaultProps = {
        film: [],
    }

    render() {
        // console.log(this.props.film)
        const { film, searchTerm, guestSessionId, ratedFilms } = this.props
        let elements = [];

        if (!searchTerm && film.length === 0) {
            elements = <p className="not-result_search">Введите название фильма</p>
        } else if (searchTerm && film.length === 0) {
            elements = <p className="not-result_search">Поиск не дал результатов</p>
        } else {
            elements = film.map((elem) => {
                    return (
                        <li key={elem.id}>
                            <Film
                              guestSessionId={guestSessionId}
                              id={elem.id}
                              img={elem.poster_path}
                              name={elem.original_title}
                              date={elem.release_date}
                              genres={elem.genre_ids}
                              description={elem.overview}
                              rating={elem.vote_average}
                              ratedRating={elem.rating}
                              ratedFilms={ratedFilms}
                            />
                        </li>
                    )
            })
        }
        return (
            <ul className="film-container">{elements}</ul>
        )
    }
}