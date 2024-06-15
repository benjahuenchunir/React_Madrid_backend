const request = require('supertest');
const app = require('../src/app');

test('Create a new user', async () => {
    const newUser = {
        name: 'Test User',
        last_name: 'Last Name',
        password: 'password',
        email: 'testuser@example.com',
        phone: '1234567890',
        profile_picture_url: 'https://ui-avatars.com/api/?name=TestUser',
        role: 'user'
    };

    const response = await request(app.callback())
        .post('/users')
        .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.lastName).toBe(newUser.last_name);
});

test('Create a new chat', async () => {
    const newChat = {
        name: 'Test Chat',
        image_url: 'https://ui-avatars.com/api/?name=TestChat',
        mode: 'everyone'
    };

    const response = await request(app.callback())
        .post('/chats')
        .send(newChat);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newChat.name);
    expect(response.body.image_url).toBe(newChat.image_url);
    expect(response.body.mode).toBe(newChat.mode);
});