import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://app:5000';

let token;

export const options = {
    stages: [
        { duration: '30s', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '30s', target: 0 },
    ],
};

// REGISTER

export const Register = (uniqueName, uniqueUsername, uniqueEmail, uniquePassword, uniquePhone) => {
    const registrationPayload = {
        name: uniqueName,
        username: uniqueUsername,
        email: uniqueEmail,
        password: uniquePassword,
        role: "superadmin",
        phone: uniquePhone,
    };
    const registrationHeaders = { 'Content-Type': 'application/json' };

    const registrationResponse = http.post(`${BASE_URL}/users`, JSON.stringify(registrationPayload), {
        headers: registrationHeaders,
    });

    check(registrationResponse, {
        'Registration successful': (resp) => resp.status === 201,
    });

    sleep(2);
};

// LOGIN

export const Login = (uniqueUsername, uniquePassword) => {
    const loginPayload = {
        username: uniqueUsername,
        password: uniquePassword,
    };
    const loginHeaders = { 'Content-Type': 'application/json' };

    const loginResponse = http.post(`${BASE_URL}/users/login`, JSON.stringify(loginPayload), {
        headers: loginHeaders,
    });

    check(loginResponse, {
        'Login successful': (resp) => resp.status === 200,
    });

    token = loginResponse.json('token');

    sleep(1);
}

// MOVIES

export const GetMovies = () => {
    const movieResponse = http.get(`${BASE_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(movieResponse, {
        'Get movies successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const GetMovieById = () => {
    const movieId = '6565e33c7b0be5636a11bc4b';

    const movieResponse = http.get(`${BASE_URL}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(movieResponse, {
        'Get movie by ID successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const GetMovieRecommendation = (uniqueUsername) => {
    const username = uniqueUsername;

    const movieResponse = http.get(`${BASE_URL}/movies/usermodeling/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(movieResponse, {
        'Get movie recommendation successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const CreateMovie = () => {
    const title = 'Test Movie';
    const image = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
    const language = 'English';
    const genre = 'Action';
    const director = 'Test Director';
    const cast = 'Test Cast 1, Test Cast 2';
    const description = 'Test Description';
    const duration = 120;
    const releaseDate = '2023/11/28';
    const endDate = '2023/12/28';

    const moviePayload = {
        title,
        image,
        language,
        genre,
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate,
    };

    const movieHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const movieResponse = http.post(`${BASE_URL}/movies`, JSON.stringify(moviePayload), {
        headers: movieHeaders,
    });

    check(movieResponse, {
        'Create movie successful': (resp) => resp.status === 201,
    });

    sleep(1);
}

// CINEMAS

export const GetCinemas = () => {
    const cinemaResponse = http.get(`${BASE_URL}/cinemas`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(cinemaResponse, {
        'Get cinemas successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const GetCinemaById = () => {
    const cinemaId = '656606cc808057cccc745d75';

    const cinemaResponse = http.get(`${BASE_URL}/cinemas/${cinemaId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(cinemaResponse, {
        'Get cinema by ID successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const CreateCinema = () => {
    const name = 'Test Cinema';
    const ticketPrice = 50000;
    const city = 'Bandung';
    const seats = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsAvailable = 10;

    const cinemaPayload = {
        name,
        ticketPrice,
        city,
        seats,
        seatsAvailable,
    };

    const cinemaHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const cinemaResponse = http.post(`${BASE_URL}/cinemas`, JSON.stringify(cinemaPayload), {
        headers: cinemaHeaders,
    });

    check(cinemaResponse, {
        'Create cinema successful': (resp) => resp.status === 201,
    });

    sleep(1);
}

export const UpdateCinema = () => {
    const cinemaId = '656606cc808057cccc745d75';
    const name = 'Test Cinema Updated';
    const ticketPrice = 70000;
    const city = 'Bandung';
    const seats = ['A', 'B', 'C', 'D'];
    const seatsAvailable = 4;

    const cinemaPayload = {
        name,
        ticketPrice,
        city,
        seats,
        seatsAvailable,
    };

    const cinemaHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const cinemaResponse = http.patch(`${BASE_URL}/cinemas/${cinemaId}`, JSON.stringify(cinemaPayload), {
        headers: cinemaHeaders,
    });

    check(cinemaResponse, {
        'Update cinema successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

// RESERVATIONS
export const GetReservations = () => {
    const reservationResponse = http.get(`${BASE_URL}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(reservationResponse, {
        'Get reservations successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const MakeReservation = (uniquePhone) => {
    const movieId = '6565e33c7b0be5636a11bc4b';
    const cinemaId = '656606cc808057cccc745d75';
    const phoneNumber = uniquePhone;
    const date = '2023/09/24';
    const startAt = 'bandung';
    const seats = ['A'];
    const ticketPrice = 50000;
    const total = 1;

    const reservationPayload = {
        date,
        startAt,
        seats,
        ticketPrice,
        total,
        movieId,
        cinemaId,
        username: 'testuser2',
        phone: phoneNumber,
        checkin: false,
    };

    const reservationHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const reservationResponse = http.post(
        `${BASE_URL}/reservations`,
        JSON.stringify(reservationPayload), {
            headers: reservationHeaders,
        }
    );

    check(reservationResponse, {
        'Reservation successful': (resp) => resp.status === 201,
    });

    sleep(1);
}

export const GetShowtimes = () => {
    const showtimeResponse = http.get(`${BASE_URL}/showtimes`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(showtimeResponse, {
        'Get showtimes successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const GetShowtimeById = () => {
    const showtimeId = '654dd21c0e2883826d60b845';

    const showtimeResponse = http.get(`${BASE_URL}/showtimes/${showtimeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(showtimeResponse, {
        'Get showtime by ID successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const CreateShowtime = () => {
    const startAt = 'bandung';
    const startDate = '2023/11/28';
    const endDate = '2023/12/28';
    const movieId = '6565e33c7b0be5636a11bc4b';
    const cinemaId = '656606cc808057cccc745d75';

    const showtimePayload = {
        startAt,
        startDate,
        endDate,
        movieId,
        cinemaId,
    };

    const showtimeHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const showtimeResponse = http.post(`${BASE_URL}/showtimes`, JSON.stringify(showtimePayload), {
        headers: showtimeHeaders,
    });

    check(showtimeResponse, {
        'Create showtime successful': (resp) => resp.status === 201,
    });

    sleep(1);
}

export default function() {
    const uniqeNumber = Math.floor(Math.random() * 100000);

    const uniqueName = `Test User ${uniqeNumber}`;
    const uniqueUsername = `testuser${uniqeNumber}`;
    const uniqueEmail = `testuser${uniqeNumber}@example.com`;
    const uniquePassword = `testuser${uniqeNumber}`;
    const uniquePhone = `+628123${uniqeNumber}`;

    Register(uniqueName, uniqueUsername, uniqueEmail, uniquePassword, uniquePhone);
    Login(uniqueUsername, uniquePassword);
    GetMovies();
    GetMovieById();
    GetMovieRecommendation(uniqueUsername);
    CreateMovie();
    GetCinemas();
    GetCinemaById();
    CreateCinema();
    UpdateCinema();
    GetReservations();
    MakeReservation(uniquePhone);
    GetShowtimes();
    GetShowtimeById();
    CreateShowtime();
    sleep(1);
}