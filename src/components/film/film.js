import React from 'react';
import { format, parseISO } from 'date-fns';
import { Rate } from 'antd';

import './film.css'

export default class Film extends React.Component {
    render() {
        // console.log(this.props.img)
        const { img, name, date, genres, description, rating, genresObj } = this.props
        console.log(genresObj)
        console.log(genres)
        const genresResult = genres.map((id) => genresObj[id])
        console.log(genresResult)
        const formatDate = date ? format(parseISO(date), 'MMMM d, y') : ''

        // console.log(date, formatDate, 'date')

        return (
            <div className="film-card">
                <img className="film-card_img" src={`https://image.tmdb.org/t/p/w500${img}`} alt="Poster" />
                <div className="film-info">
                    <h2 className="film-name">
                        {name.length <= 30 ? name : `${name.substring(0, 30)}...`}
                    </h2>
                    <p className="film-date">{date && formatDate}</p>
                    <ul className="film-genre">
                        {genresResult.map((genre, index) => (
                            <li
                              key={index}
                              className="film-genre_container"
                            >{genre}
                            </li>
                        ))}
                    </ul>
                    <p className="film-description">
                         {description.length <= 180 ? description : `${description.substring(0, 180)}...`}
                    </p>
                    <div className="film-rate">
                        <Rate count={10} allowHalf style={{ fontSize: 16 }} />
                    </div>
                    <div className="film-rating film-rating_color">{rating.toFixed(1)}</div>
                </div>
            </div>
        )
    }
}