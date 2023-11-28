import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://app:5000';

// Declare token at global
let token;

export const options = {
    stages: [
        { duration: '2m', target: 200 },
        { duration: '20m', target: 200 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
};

// LOGIN

export const Login = () => {
    const loginPayload = {
        username: 'testuser2',
        password: 'testuser2',
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

export const GetMovieRecommendation = () => {
    const username = 'testuser2';

    const movieResponse = http.get(`${BASE_URL}/movies/usermodeling/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    check(movieResponse, {
        'Get movie recommendation successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const EditMoviePhoto = () => {
    const movieId = '654dd0e40e2883108a60b830';
    const filePath = './images/Test.svg.png';

    const editPhotoHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const editPhotoResponse = http.post(
        `${BASE_URL}/movies/photo/${movieId}`, { file: http.file(filePath) }, { headers: editPhotoHeaders },
    );

    check(editPhotoResponse, {
        'Edit movie photo successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const DeleteMovie = () => {
    const movieId = '6565cee3627e4ed107425e16';

    const movieHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const movieResponse = http.del(`${BASE_URL}/movies/${movieId}`, null, {
        headers: movieHeaders,
    });

    check(movieResponse, {
        'Delete movie successful': (resp) => resp.status === 200,
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
    const cinemaId = '654dd0570e2883c31060b82b';

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

export const UploadCinemaPhoto = () => {
    const cinemaId = '654dd7140e2883116560b84f';
    const filePath = './images/Test.svg.png';

    const uploadPhotoHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const uploadPhotoResponse = http.post(
        `${BASE_URL}/cinemas/photo/${cinemaId}`, { file: http.file(filePath) }, { headers: uploadPhotoHeaders },
    );

    check(uploadPhotoResponse, {
        'Upload cinema photo successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

export const UpdateCinema = () => {
    const cinemaId = '654dd7140e2883116560b84f';
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

export const DeleteCinema = () => {
    const cinemaId = '654dd7140e2883116560b84f';

    const cinemaHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const cinemaResponse = http.del(`${BASE_URL}/cinemas/${cinemaId}`, null, {
        headers: cinemaHeaders,
    });

    check(cinemaResponse, {
        'Delete cinema successful': (resp) => resp.status === 200,
    });

    sleep(1);
}

// INVITATIONS

export const SendInvitationEmail = () => {
    const email = 'xxxxxxx@gmail.com';
    const host = 'CINEMA PLUS';
    const movie = 'Test Movie';
    const date = '2023-09-24';
    const time = '6.00PM GMT+7';
    const cinema = 'cinema updated';
    const image = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';
    const seat = 'A';

    const invitationPayload = {
        email,
        host,
        movie,
        date,
        time,
        cinema,
        image,
        seat,
    };

    const invitationHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const invitationResponse = http.post(`${BASE_URL}/invitations`, JSON.stringify(invitationPayload), {
        headers: invitationHeaders,
    });

    check(invitationResponse, {
        'Send invitation email successful': (resp) => resp.status === 201,
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

export const MakeReservation = () => {
    const movieId = '654dd0e40e2883108a60b830';
    const cinemaId = '654dd0570e2883c31060b82b';
    const phoneNumber = '12345678901';
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
    const movieId = '654dd0e40e2883108a60b830';
    const cinemaId = '654dd0570e2883c31060b82b';

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
    Login();
    GetMovieById();
    MakeReservation();
}