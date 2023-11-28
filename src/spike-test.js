import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'http://localhost:5000';

export let options = {
    stages: [
        { duration: '2m', target: 2000 },
        { duration: '1m', target: 0 },
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
    const loginHeaders = {'Content-Type': 'application/json'};
  
    const loginResponse = http.post(`${BASE_URL}/users/login`, JSON.stringify(loginPayload), {
      headers: loginHeaders,
    });
  
    check(loginResponse, {
      'Login successful': (resp) => resp.status === 200,
    });
  
      token = loginResponse.json('token');
  
    sleep(1);
  }
    
  export const GetMovieById = () => {
    const movieId = '654dd0e40e2883108a60b830';

    const movieResponse = http.get(`${BASE_URL}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }, 
    });

    check(movieResponse, {
        'Get movie by ID successful': (resp) => resp.status === 200,
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
      JSON.stringify(reservationPayload),
      {
        headers: reservationHeaders,
      }
    );
  
    check(reservationResponse, {
      'Reservation successful': (resp) => resp.status === 201,
    });
  
    sleep(1);
  }

export default function () {
    Login();
    GetMovieById();
    MakeReservation();
}