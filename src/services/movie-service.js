// const url = 'https://api.themoviedb.org/3/seah/movie?query=';
// const url = 'https://api.themoviedb.org/3/search/movie?query=';
// const url = 'https://api.themoviedb.org/3/search/movie?api_key=8e57927baec4f3a6ef70ae7224484da7&include_adult=false&language=en-US&page=1&query=';
// const url = 'https://api.themoviedb.org/3/search/movie?api_key=8e57927baec4f3a6ef70ae7224484da7&include_adult=false&language=en-US&page=';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTU3OTI3YmFlYzRmM2E2ZWY3MGFlNzIyNDQ4NGRhNyIsInN1YiI6IjY1YTJkMTZjMzk1NDlhMDEyNjEwNzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_IVRXsSUjXawG2H_BO_XapqW67eJmydbfez9kJR9Rk',
//     },
// };

const MovieService = async (query, page) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8e57927baec4f3a6ef70ae7224484da7&language=en-US&query=${query}&page=${page}&include_adult=false`)
    if (!res.ok) {
        throw new Error(`NOT FETCH ${res.status}`)
    }
    return res.json()
}

export default MovieService
// const MovieService = async (query) => {
//         const res = await fetch(url + query)
//         if (!res.ok) {
//             throw new Error(`NOT FETCH ${res.status}`)
//         }
//         return res.json()
// }
//
// export default MovieService
