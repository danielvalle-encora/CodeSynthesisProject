// import { expect } from 'chai';
// import app from '../server';

// describe('Express API', () => {
//     it('should return a welcome message', async () => {
//         const res = await request(app).get('/');
//         expect(res.status).to.equal(200);
//         expect(res.body.message).to.equal('Welcome to the Express API');
//     });

//     it('should return a specific user', async () => {
//         const res = await request(app).get('/users/1');
//         expect(res.status).to.equal(200);
//         expect(res.body.id).to.equal(1);
//         expect(res.body.name).to.equal('John Doe');
//     });

//     it('should create a new user', async () => {
//         const res = await request(app)
//             .post('/users')
//             .send({ name: 'Jane Smith' });
//         expect(res.status).to.equal(201);
//         expect(res.body.name).to.equal('Jane Smith');
//     });

//     it('should update an existing user', async () => {
//         const res = await request(app)
//             .put('/users/1')
//             .send({ name: 'Updated Name' });
//         expect(res.status).to.equal(200);
//         expect(res.body.id).to.equal(1);
//         expect(res.body.name).to.equal('Updated Name');
//     });

//     it('should delete an existing user', async () => {
//         const res = await request(app).delete('/users/1');
//         expect(res.status).to.equal(200);
//         expect(res.body.message).to.equal('User deleted successfully');
//     });
// });