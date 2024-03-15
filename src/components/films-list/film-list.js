import React from 'react';

import Film from '../film';
import defaultPoster from '../../public/out.jpg'

import './film-list.css'

export default class FilmList extends React.Component {
    static defaultProps = {
        film: [],
        ratedFilms: [],
    }

    replaceFilmWithRated = (film, ratedFilms, tabKey) => {
        if (tabKey === '2') {
            return ratedFilms
        } if (ratedFilms.length === 0) {
            return film
        }
            return film.map((elem) => {
                const ratedFilm = ratedFilms.find((ratedElem) => ratedElem.id === elem.id)
                return ratedFilm || elem
            })
    }

    render() {
        const { film, searchTerm, guestSessionId, tabKey, ratedFilms } = this.props
        const updatedFilmList = this.replaceFilmWithRated(film, ratedFilms, tabKey)
        let elements = []
        if (!searchTerm && updatedFilmList.length === 0 && tabKey === '1') {
            elements = <p className="not-result_search">Введите название фильма</p>
        } else if (searchTerm && updatedFilmList.length === 0 && tabKey === '1') {
            elements = <p className="not-result_search">Поиск не дал результатов</p>
        } else if (tabKey === '2' && updatedFilmList.length === 0) {
            elements = <p className="not-result_search">В избранном пока что отсутвует список фильмов</p>
        } else {
            elements = updatedFilmList.map((elem) => {
               const poster = elem.poster_path ? `https://image.tmdb.org/t/p/w500${elem.poster_path}` : defaultPoster
                    return (
                        <li key={elem.id}>
                            <Film
                              guestSessionId={guestSessionId}
                              id={elem.id}
                              img={poster}
                              name={elem.original_title}
                              date={elem.release_date}
                              genres={elem.genre_ids}
                              description={elem.overview}
                              rating={elem.vote_average}
                              ratedRating={elem.rating}
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