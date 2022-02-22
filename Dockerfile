## Use Node Slim image
FROM node:14-slim

## Copy source code
COPY . .

## Start the application
CMD ["node", "dist/angular-app/server/main.js"]

## Docker startup
## docker build -t angular-app .
## docker run -p 4000:4000 angular-app
