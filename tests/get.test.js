const request = require('supertest');
const app = require('../src/app');

test('Get all my chats', async () => {
    const response = await request(app.callback())
        .get('/chats')
        .query({ userId: 1 });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(chat => {
        expect(chat).toHaveProperty('id');
        expect(chat).toHaveProperty('name');
        expect(chat).toHaveProperty('imageUrl');
        expect(chat).toHaveProperty('canSendMessage');
        expect(chat).toHaveProperty('lastMessage');
        expect(chat).toHaveProperty('isDm');
    });
});

test('Get messages for a specific chat', async () => {
    const chatId = 1;
    const response = await request(app.callback())
        .get(`/chats/${chatId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(message => {
        expect(message).toHaveProperty('id');
        expect(message).toHaveProperty('message');
        expect(message).toHaveProperty('createdAt');
        expect(message).toHaveProperty('User');
        expect(message.User).toHaveProperty('id');
        expect(message.User).toHaveProperty('name');
        expect(message.User).toHaveProperty('profile_picture_url');
        expect(message).toHaveProperty('MessageFiles');
    });
});