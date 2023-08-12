# nodejs-jwt-token-authentication-project

## 💡 Overview

In this project, I introduced myself to [JSON Web Token (JWT)](https://jwt.io), a compact URL-safe means of representing claims to be transferred between two parties. In this simple dashboard, when user logs in with a username and a password, the token gets generated. It will be verified and if it is valid, the lucky number will be generated.

## Learned

I have worked with:

1. Two routes (`Login` and `Dashboard`)
2. Authentication middleware
3. Learned about [JSON Web Token (JWT)](https://jwt.io).
4. Configured Custom Error Handlers & combined them in `index.js`
5. [Http Status codes Package](https://www.npmjs.com/package/http-status-codes)

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/ayazhankadessova/trip-generator-with-OpenAI.git
```

2. Go to the project directory

```bash
  cd trip-generator-with-OpenAI
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in root directory and add following constant:

- Create an environment variable `JWT_SECRET` and add random string,this variable will be used to sign the JWT Token. You can generate a token online :)

5. Start the app

```bash
npm start
```

## APIs

> You can run API in Postman.

### 1. User Login API

<br>

This Api returns JWT Token After successful Login.

#### API Endpoint

`POST` `http://localhost:3000/api/v1/login`

#### Sample Request Body

```json
{
  "username": "Yerkezhan",
  "password": "1234"
}
```

#### Output

```json
{
  "msg": "user created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJZZXJrZXpoYW4iLCJpYXQiOjE2OTE1NjUyNjgsImV4cCI6MTY5NDE1NzI2OH0.vQl4GUbPmzbv15F_DkkxwWjd5urPJ7VfcXXJ_UB5hGc"
}
```

### 2. Dashboard API

<br>

This Api generates a random number for a user if the Token is valid & present

#### API Endpoint

`GET` `http://api_domain:3000/api/v1/dashboard`

#### Headers

In order to use this endpoint, you need to pass `token` that we have created in the `Login` as the Authorization field in the header

`Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJZZXJrZXpoYW4iLCJpYXQiOjE2OTE1NjUyNjgsImV4cCI6MTY5NDE1NzI2OH0.vQl4GUbPmzbv15F_DkkxwWjd5urPJ7VfcXXJ_UB5hGc"`

#### Output

```json
{
  "msg": "Hello, Yerkezhan",
  "secret": "Your lucky number is 33. You can use it to authorize the data"
}
```

## Author

- [@ayazhankadessova](https://github.com/ayazhankadessova)
- [Linkedin](https://www.linkedin.com/in/ayazhankad/)

## About Me

I'm an aspiring software developer from Kazakhstan, studying in Hong Kong.

👩‍💻 I'm currently improving my skills in Node.js :)

## ✍️ Project Steps & Notes

- Saved My Steps & Notes [here](https://github.com/ayazhankadessova/dev-environment-tf-azure/blob/main/Notes.md).
