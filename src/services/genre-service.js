const GenreService = async () => {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8e57927baec4f3a6ef70ae7224484da7');
    if (!response.ok) {
        throw new Error(`NOT FETCH Genres ${response.status}`)
    }
    const jsonRes = await response.json();
    const genresObj = {};
    jsonRes.genres.map((elem) => {
        genresObj[elem.id] = elem.name;
    });
    return genresObj;
}

export default GenreService