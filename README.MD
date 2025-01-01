#### Description

This is a simple CRUD project I created by following the same project from the freecodecamp YouTube channel.
This project allows me to improve essential CRUD operations using mongoDB and mongoose, user authentication and authorization with jsonwebtoken, and creating API testing with Swagger UI.

#### Setup

```bash
npm install && npm start
```

#### .env

-   Create .env file with these values

1. DATABASE_URL – Connection string for your MongoDB database.
2. PORT – Port number the application will run on.
3. JWT_SECRET_KEY – Secret key used for signing JSON Web Tokens.
4. JWT_LIFETIME – Duration for which the JWT remains valid (e.g., 1d, 24h, etc.)

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```
