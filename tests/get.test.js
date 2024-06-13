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