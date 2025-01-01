#### Setup

```bash
npm install && npm start
```

#### .env

-   Create .env file with these values

1. DATABASE_URL=
2. PORT=
3. JWT_SECRET_KEY=
4. JWT_LIFETIME=

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```
