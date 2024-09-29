FROM node:lts-alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm i
RUN npm run test:coverage
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]