## Access

- JWT -> token to access secret info
- Get token -> token to access secret info
- If valid token is present in the request, user can access the info

## Typical workflow

- Add controllers
- Add them to routes
- Add router to app.js

## Checks , Use CustomError

- check if username & password exist before issuing the token

```
  // mongo in the future

  // joi (authentication)

  // check values
```

- If username or password does not exist:

```
  if (!username || !password) {
    throw new CustomAPIError('Please provide a username and password', 400)
  }
```

## Two routes

1. Public - accessible by anyone

Login Request ->
Response + Signed JWT <-

2. Private - accessible by signed JWT

Response + Signed JWT ->
Response <-

## Why JWT

1. Security feature -> integrity

- data has not been tampered with

2. Server is stateless so does not remmber , so need to provide token one more time

https://jwt.io

## What is the JSON Web Token structure?

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following.

> xxxxx.yyyyy.zzzzz

Let's break down the different parts.

1. Header

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

- For example:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- Then, this JSON is Base64Url encoded to form the first part of the JWT.

2. Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

Registered claims: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: iss (issuer), exp (expiration time), sub (subject), aud (audience), and others.

Public claims: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.

Private claims: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims.

- Example payload:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

3. Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

- Putting all together

The output is three Base64-URL strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact when compared to XML-based standards such as SAML.

The following shows a JWT that has the previous header and payload encoded, and it is signed with a secret.

- Summary :

- Header = algo & type
- Payload = info (get resources that belong only to that user)
- Signature = secret to sign token -> have to keep on server

## NPM Package

https://www.npmjs.com/package/jsonwebtoken

## Create JWT Token

```
  if (!username || !password) {
    throw new CustomAPIError('Please provide a username and password', 400)
  }

  // create token

  // normally id is provided by DB, but for demo, we use date

  // payload, jwt secret, expires in option
  // jwt secret needs to be long & unguessable
  const id = new Date().getDate()

  // try to keep payload small, better user experience
  const token = jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET)

  res.status(200).json({ msg: 'user created' }, token)
}
```

## How it works

- JWT Token gets generated and it need to be sent to the frontend, so it can use it as bearer token and get the data later.
- So, now we need to work on sending the token that we have just generated and which is sitting in the local storage
- If we browse the network request, we can see that the token should be sent in the header as the Authorization : bearer toke, which we can also see in the `browser-app.js`
- So, in the dashboard, we are looking for the headers.

## Get Token and Verify it

```
const authHeader = req.headers.authorization

  // assign Authorization header to the value
  // If authHeader does not exist or if it does not start with the Bearer, then throw our custom Error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No Token Provided', 401)
  }

  const token = authHeader.split(' ')[1]

  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }
```

## Make it Dynamic

```
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
      msg: `Hello, ${decoded['username']}`,
      secret: `Your lucky number is ${luckyNumber}. You can use it to authorize the data`,
    })

    console.log(decoded)
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }
```

- WIll get specialized greeting
