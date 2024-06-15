const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');
const faker = require('faker');
const path = require('path');
const bcrypt = require('bcrypt');

const mockUser = {
    name: faker.name.findName(),
    last_name: faker.name.lastName(),
    password: bcrypt.hashSync('password123', 5),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    profile_picture_url: faker.image.avatar(),
    role: 'user'
};

let user;

beforeEach(async () => {
    user = await User.create(mockUser);
});

test('User login', async () => {
    const userCredentials = {
        email: user.email,
        password: 'password123'
    };

    const response = await request(app.callback()).post('/auth/login').send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('token_type', 'Bearer');
    expect(response.body).toHaveProperty('expires_in');
    expect(response.body).toHaveProperty('scope');
});

test('User signup', async () => {
    const userCredentials = {
        name: faker.name.findName(),
        last_name: faker.name.lastName(),
        password: 'password123',
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        role: 'user'
    };

    const response = await request(app.callback())
        .post('/auth/signup')
        .field('name', userCredentials.name)
        .field('last_name', userCredentials.last_name)
        .field('password', userCredentials.password)
        .field('email', userCredentials.email)
        .field('phone', userCredentials.phone)
        .field('role', userCredentials.role)
        .attach('file', path.join(__dirname, '../assets/ER-Model.png'));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
});