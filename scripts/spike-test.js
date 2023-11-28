import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'http://app:5000';

let token;

export let options = {
    stages: [
        { duration: '2m', target: 2000 },
        { duration: '1m', target: 0 },
    ],
};

export const Register = (uniqueName, uniqueUsername, uniqueEmail, uniquePassword, uniquePhone) => {
    const registrationPayload = {
        name: uniqueName,
        username: uniqueUsername,
        email: uniqueEmail,
        password: uniquePassword,
        role: "guest",
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

export const Login = (uniqueUsername, uniquePassword) => {
    const loginPayload = {
        username: uniqueUsername,
        password: uniquePassword,
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

export const MakeReservation = (uniquePhone) => {
    const movieId = '654dd0e40e2883108a60b830';
    const cinemaId = '654dd0570e2883c31060b82b';
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
    const uniqeNumber = Math.floor(Math.random() * 100000);

    const uniqueName = `Test User ${uniqeNumber}`;
    const uniqueUsername = `testuser${uniqeNumber}`;
    const uniqueEmail = `testuser${uniqeNumber}@example.com`;
    const uniquePassword = `testuser${uniqeNumber}`;
    const uniquePhone = `+628123${uniqeNumber}`;

    Register(uniqueName, uniqueUsername, uniqueEmail, uniquePassword, uniquePhone);
    Login(uniqueUsername, uniquePassword);
    GetMovieById();
    MakeReservation(uniquePhone);
}