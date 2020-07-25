# Task Manager API

A backend focused task manager API using Node.js in Express as part of lessons for gaining more experience with Node.

This application allows one to connect to a local mongoDB database to register users, log them in, and allow them to create and access tasks. 

Setup
-----

Ensure there is a proper mongoDB database setup on the localhost prior to using this API. All user and task backend interactions will be done in a database named **task-manager-api**.

Environment variables are to be set in a configuration directory at the root of the project named **config**. Inside of this directory is the config file containing environment variables named **dev.env**. The following environment variables are to be included:

- PORT=3000
- JWT_SECRET=<Key in string format used for the JSON web token>
- MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api

The PORT and MONGODB_URL can be changed accordingly as needed if this project is used in other settings such as with a database not connected to locally.

Usage
-----

This project is to be used exclusively as a backend API. Usage is performed exclusively through HTTP requests, and as such a tool such as **Postman** should be used to submit requests. 

Basic CRUD operations are available for *Users* and *Tasks*, and the corresponding paths and expected HTTP request body contents can be found in the routers and models for each.

Requests that require authorization are done using JSON web tokens, and are needed in the HTTP request header as a bearer token for a user.

A testing suite is available and can be run using ***npm run test***.

Modules Used
-----------------
- [Express](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Validator](https://www.npmjs.com/package/validator)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Sharp](https://www.npmjs.com/package/sharp)
- [env-cmd](https://www.npmjs.com/package/env-cmd)
- [Jest](https://www.npmjs.com/package/jest)
- [Supertest](https://www.npmjs.com/package/supertest)