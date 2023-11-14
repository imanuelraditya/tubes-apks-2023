import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'http://localhost:5000';

export let options = {
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
    stages: [
        { duration: '10s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
};

export const TicketReservation = () => {
    const url = `${BASE_URL}/reservations`;
    const payload = JSON.stringify({
        date: "2023/09/24",
        startAt: "bandung",
        seats: ["B"],
        ticketPrice: 50000,
        total: 1,
        movieId: "650d3fa4dd4dc724ef947f6c",
        cinemaId: "650c5c2ee1101d1be65d8a48",
        username: "wisnuas",
        phone: "08123456789",
        checkin: false
    });
    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const res = http.post(url, payload, params);
    check(res, {
        'is status 201': (r) => r.status === 201,
        'transaction time OK': (r) => r.timings.duration < 200,
    });
    sleep(1);
    }
    
export const MovieSearch = () => {
    const url = `${BASE_URL}/movies/654dd0e40e2883108a60b830`;
    const res = http.get(url);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'transaction time OK': (r) => r.timings.duration < 200,
    });
    sleep(1);
    }

export const UserAuthentication = () => {
    const url = `${BASE_URL}/users/login`;
    const payload = JSON.stringify({
        username: "pege",
        password: "pw123456"
    });
    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };
    const res = http.post(url, payload, params);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'transaction time OK': (r) => r.timings.duration < 200,
    });
    sleep(1);
    }

export default function () {
    TicketReservation();
    MovieSearch();
    UserAuthentication();
}