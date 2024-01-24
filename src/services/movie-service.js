const MovieServices = () => {
    const label = 'hulk'
    const url = `https://api.themoviedb.org/3/search/movie?query=${label}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTU3OTI3YmFlYzRmM2E2ZWY3MGFlNzIyNDQ4NGRhNyIsInN1YiI6IjY1YTJkMTZjMzk1NDlhMDEyNjEwNzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_IVRXsSUjXawG2H_BO_XapqW67eJmydbfez9kJR9Rk',
        },
    };

    async function getResource() {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`NOT FETCH ${res.status}`)
        }
        return res.json()
    }

    async function getAllFilms() {
        const res = await getResource()
        return res.results
    }
    return (
        getAllFilms().then((el) => {
            console.log(el)
        })
    )
}

export default MovieServices
