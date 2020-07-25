const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne, userOneId, userTwo, taskOne, taskOneId, taskTwo, taskTwoId, taskThreeId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'From my test'
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Should get all tasks for user one', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toHaveLength(2);
});

test('Second user cannot delete first user tasks', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

    const task = await Task.findById(taskOneId);
    expect(task).not.toBeNull();
});

test('Should not create task with invalid description', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: ''
    })
    .expect(400);
});

test('Should not create task with invalid completed', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Desc',
      completed: 5
    })
    .expect(400);
});

test('Should not update task with invalid description', async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: ''
    })
    .expect(500);
});

test('Should not update task with invalid completed', async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Desc',
      completed: '5'
    })
    .expect(500);
});

test('Should delete user task', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const task = await Task.findById(taskOneId);
  expect(task).toBeNull();
});

test('Should not delete user task if unauthenticated', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOneId}`)
    .send()
    .expect(401);

  const task = await Task.findById(taskOneId);
  expect(task).not.toBeNull();
});

test('Second user cannot update first user tasks', async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      description: 'Fail'
    })
    .expect(404);
});

test('Should fetch user task by id', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body._id).toEqual(taskOneId.toString());
});

test('Should not fetch user task by id without auth', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOneId}`)
    .send()
    .expect(401);
});

test('Should not fetch user task by id if the user is different', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOneId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});

test('Should fetch completed user tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=true`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].completed).toEqual(true);
  expect(response.body).toHaveLength(1);
});

test('Should fetch incompleted user tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=false`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].completed).toEqual(false);
  expect(response.body).toHaveLength(1);
});

test('Should fetch user tasks', async () => {
  const response = await request(app)
    .get(`/tasks`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toHaveLength(2);
});

test('Should fetch completed user tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=true`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].completed).toEqual(true);
  expect(response.body).toHaveLength(1);
});