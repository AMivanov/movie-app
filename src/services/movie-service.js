// const url = 'https://api.themoviedb.org/3/seah/movie?query=';
const url = 'https://api.themoviedb.org/3/search/movie?query=';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTU3OTI3YmFlYzRmM2E2ZWY3MGFlNzIyNDQ4NGRhNyIsInN1YiI6IjY1YTJkMTZjMzk1NDlhMDEyNjEwNzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_IVRXsSUjXawG2H_BO_XapqW67eJmydbfez9kJR9Rk',
    },
};

const MovieService = async (query) => {
        const res = await fetch(url + query, options)
        if (!res.ok) {
            throw new Error(`NOT FETCH ${res.status}`)
        }
        return res.json()
}

export default MovieService
