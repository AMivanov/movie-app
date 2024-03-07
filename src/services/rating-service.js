const AddRating = async (movie_id, rating, guestSessionId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=8e57927baec4f3a6ef70ae7224484da7&guest_session_id=${guestSessionId}`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTU3OTI3YmFlYzRmM2E2ZWY3MGFlNzIyNDQ4NGRhNyIsInN1YiI6IjY1YTJkMTZjMzk1NDlhMDEyNjEwNzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_IVRXsSUjXawG2H_BO_XapqW67eJmydbfez9kJR9Rk',
        },
        body: JSON.stringify({
            value: rating,
        }),
    })
    // console.log(rating)
    if (!response.ok) {
        throw new Error(`NOT FETCH ${response.status}`)
    }
}

const GetRating = async (guestSessionId, page = 1) => {
    const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=8e57927baec4f3a6ef70ae7224484da7&language=en-US&page=${page}&sort_by=created_at.asc`)
    if (!response.ok) {
        throw new Error(`NOT FETCH ${response.status}`)
    }
    return response.json()
}

const DeleteRating = async (guestSessionId, movie_id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=8e57927baec4f3a6ef70ae7224484da7&guest_session_id=${guestSessionId}`, {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
    // console.log(rating)
    if (!response.ok) {
        throw new Error(`NOT FETCH ${response.status}`)
    }
    return response.json()
}

export { GetRating, AddRating, DeleteRating }
// const AddRating = async (movie_id, rating) => {
//     const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=8e57927baec4f3a6ef70ae7224484da7`, {
//         method: 'POST',
//         headers: {
//             accept: 'application/json',
//             'Content-Type': 'application/json;charset=utf-8',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTU3OTI3YmFlYzRmM2E2ZWY3MGFlNzIyNDQ4NGRhNyIsInN1YiI6IjY1YTJkMTZjMzk1NDlhMDEyNjEwNzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_IVRXsSUjXawG2H_BO_XapqW67eJmydbfez9kJR9Rk',
//         },
//         body: JSON.stringify({
//             value: rating,
//         }),
//     })
//
//     if (!response.ok) {
//         throw new Error(`NOT FETCH ${response.status}`)
//     }
// }

// const GetRating = async (guestSessionId) => {
//     const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=8e57927baec4f3a6ef70ae7224484da7&language=en-US&page=1&sort_by=created_at.asc`)
//     if (!response.ok) {
//         throw new Error(`NOT FETCH ${response.status}`)
//     }
// }