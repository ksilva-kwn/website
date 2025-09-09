FROM node:trixie-slim

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start", "--port", "3000"]