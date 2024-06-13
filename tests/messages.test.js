const request = require('supertest');
const app = require('../src/app');
const faker = require('faker');
const {User, Chat, Member} = require('../src/models');

const mockUser = {
    name: faker.name.findName(),
    last_name: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    profile_picture_url: faker.image.avatar(),
    role: 'user'
};

const mockChat = {
    name: faker.lorem.words(3),
    image_url: faker.image.imageUrl(),
    mode: 'admin-only'
};

let user;
let chat;
let messageId;

beforeEach(async () => {
    user = await User.create(mockUser);
    chat = await Chat.create(mockChat);
    await Member.create({
        id_user: user.id,
        id_chat: chat.id,
        role: 'owner'
    });
});


test('Create a new message', async () => {
    const response = await request(app.callback())
        .post('/messages')
        .send({
            idUser: user.id,
            idChat: chat.id,
            message: 'Test message'
        });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Test message');

    messageId = response.body.id;
});

test('Update a message', async () => {
    const response = await request(app.callback())
        .patch(`/messages/${messageId}`)
        .send({
            message: 'Updated test message'
        });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Updated test message');
});

test('Delete a message', async () => {
    const response = await request(app.callback())
        .delete(`/messages/${messageId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Mensaje eliminado con éxito');
});