import React from 'react';

import Film from '../film';
import defaultPoster from '../../public/out.jpg'

import './film-list.css'

export default class FilmList extends React.Component {
    static defaultProps = {
        film: [],
    }

    render() {
        const { film, searchTerm, guestSessionId, tabKey } = this.props
        let elements = []
        if (!searchTerm && film.length === 0 && tabKey === '1') {
            elements = <p className="not-result_search">Введите название фильма</p>
        } else if (searchTerm && film.length === 0 && tabKey === '1') {
            elements = <p className="not-result_search">Поиск не дал результатов</p>
        } else if (tabKey === '2' && film.length === 0) {
            elements = <p className="not-result_search">В избранном пока что отсутвует список фильмов</p>
        } else {
            elements = film.map((elem) => {
                const imgField = tabKey === '1' ? 'poster_path' : 'img'
                const nameField = tabKey === '1' ? 'original_title' : 'name'
                const dateField = tabKey === '1' ? 'release_date' : 'date'
                const genresField = tabKey === '1' ? 'genre_ids' : 'genres'
                const descriptionField = tabKey === '1' ? 'overview' : 'description'
                const rating = tabKey === '1' ? 'vote_average' : 'rating'
                const ratedRating = JSON.parse(localStorage.getItem('filmRatings'))?.[elem.id] || 0
                let poster
                if (tabKey === '1') {
                    poster = elem[imgField] ? `https://image.tmdb.org/t/p/w500${elem[imgField]}` : defaultPoster
                } else {
                    poster = elem[imgField] ? elem[imgField] : defaultPoster
                }
                    return (
                        <li key={elem.id}>
                            <Film
                              guestSessionId={guestSessionId}
                              id={elem.id}
                              img={poster}
                              name={elem[nameField]}
                              date={elem[dateField]}
                              genres={elem[genresField]}
                              description={elem[descriptionField]}
                              rating={elem[rating]}
                              ratedRating={ratedRating}
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