## Use Node Slim image
FROM node:14-slim

## Copy source code
COPY . .

## Start the application
CMD ["node", "dist/angular-test-app/server/main.js"]

## Docker startup
## docker build -t angular-test-app .
## docker run -p 4000:4000 angular-test-app
