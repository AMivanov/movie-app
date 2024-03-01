const GuestSession = async () => {
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8e57927baec4f3a6ef70ae7224484da7')
    if (!response.ok) {
        throw new Error(`NOT FETCH ${response.status}`)
    }
    const guestSessionId = await response.json();
    // console.log(guestSessionId)
    return guestSessionId.guest_session_id
}

export default GuestSession