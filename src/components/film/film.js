import React from 'react';
import { format, parseISO } from 'date-fns';
import { Rate } from 'antd';

import { AddRating } from '../../services/rating-service'
import { GenreServiceConsumer } from '../genre-service-context';

import './film.css';

export default class Film extends React.Component {
    classNameRating;

    constructor(props) {
        super(props);
        this.state = {
            valueRate: this.props.ratedRating || 0,
        }
    }

    handleClickRate = (e) => {
        const { id, guestSessionId, ...filmData } = this.props
        this.setState({
            valueRate: e,
        });
        AddRating(id, e, guestSessionId)
        const ratings = JSON.parse(localStorage.getItem('filmRatings')) || {}
        ratings[id] = e
        localStorage.setItem('filmRatings', JSON.stringify(ratings))
        const allFilmData = { id, ...filmData, valueRate: e }
        localStorage.setItem(`film-${id}`, JSON.stringify(allFilmData));
    }

    componentDidMount() {
        const { id } = this.props;
        const ratings = JSON.parse(localStorage.getItem('filmRatings')) || {};
        const ratedRating = ratings[id];
        if (ratedRating) {
            this.setState({ valueRate: ratedRating });
        }
        const allFilmData = JSON.parse(localStorage.getItem(`film-${id}`));
        if (allFilmData) {
            this.setState({ valueRate: allFilmData.valueRate || 0 });
        }
    }

    render() {
        const { img, name, date, genres, description, rating } = this.props
        const formatDate = date ? format(parseISO(date), 'MMMM d, y') : ''
        if (rating >= 0 && rating < 3) this.classNameRating += ' film-rating_color-red'
        if (rating >= 3 && rating < 5) this.classNameRating += ' film-rating_color-orange'
        if (rating >= 5 && rating < 7) this.classNameRating += ' film-rating_color-yellow'
        if (rating >= 7) this.classNameRating += ' film-rating_color-green'
        return (
            <GenreServiceConsumer>
                {
                    (genresObj) => {
                        const genresResult = genres.map((id) => genresObj[id])
                        return (
                            <div className="film-card">
                                <img
                                  className="film-card_img"
                                  src={img}
                                  alt="Poster"
                                />
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
                                        <Rate
                                          count={10}
                                          allowHalf
                                          style={{ fontSize: 16 }}
                                          defaultValue={this.state.valueRate}
                                          onChange={this.handleClickRate}
                                        />
                                    </div>
                                    <div className={`film-rating ${this.classNameRating}`}>{rating.toFixed(1)}</div>
                                </div>
                            </div>
                        )
                    }
                }
            </GenreServiceConsumer>
        )
    }
}