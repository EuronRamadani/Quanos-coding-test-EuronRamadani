FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 9000

CMD ["npx", "quasar", "dev", "--hostname", "0.0.0.0", "--port", "9000"]
