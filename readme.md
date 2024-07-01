Create the .env file in root directory by taking a reference of .env.example file.

## Installing the dependencies after creating .env file

```
npm install
```

## To start the node server:-

```
npm run dev
```

## Start node process in production environment:-

```
pm2 kill && pm2 start ecosystem.config.js --env production
```