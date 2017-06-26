# Messenger

Simple messenger application

## External requirements

- Postgres

## Initial setup

```
createdb messenger_development
createdb messenger_test
npm run migrate
npm run seed
npm install
npm install nodemon -g
cp .env.example .env
npm run build-client
```

## Running tests
```
createdb messenger_test
npm test
```

## Development

```
nodemon
```

In another terminal

```
npm run watch-client
```
