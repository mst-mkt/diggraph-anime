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

4. Start the development server

```sh
pnpm dev
```
5. Open your browser and go to [`http://localhost:3000`](http://localhost:3000)

## Environment Variables

- `BASE_URL`: The base URL of your application. (default: `http://localhost:3000`)
- `ANNICT_CLIENT_ID`: [Annict OAuth](https://annict.com/oauth/applications) client ID
- `ANNICT_CLIENT_SECRET`: [Annict OAuth](https://annict.com/oauth/applications) client secret
- `AUTH_SECRET`: Secret for Auth.js (generate with `pnpx auth secret --raw`)
