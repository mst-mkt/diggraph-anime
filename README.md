# Diggraph Anime

## Development

### Requirements

- Node.js
- pnpm

### Setup

1. Install dependencies

```sh
pnpm i
```

2. Copy env file

```sh
cp .env.local.example .env.local
```

3. Fill your [env variables](#environment-variables) in `.env.local`

4. Set up the database

```sh
cp example.db local.db
```

```sh
pnpm migrate
```

5. Start the development server

```sh
pnpm dev
```
6. Open your browser and go to [`http://localhost:3000`](http://localhost:3000)

## Environment Variables

- `BASE_URL`: The base URL of your application. (default: `http://localhost:3000`)
- `ANNICT_CLIENT_ID`: [Annict OAuth](https://annict.com/oauth/applications) client ID
- `ANNICT_CLIENT_SECRET`: [Annict OAuth](https://annict.com/oauth/applications) client secret
- `AUTH_SECRET`: Secret for Auth.js (generate with `pnpx auth secret --raw`)

## Screen Shot

![image](https://github.com/user-attachments/assets/c19f01ec-0ceb-4d1f-8b61-ee7ce34719d1)
