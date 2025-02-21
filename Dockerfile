FROM node:20

WORKDIR /app

COPY package*.json ./

# RUN npm install -g pnpm

RUN npm install

COPY . .

# RUN  pnpm prisma generate && pnpm exec tsc
RUN  npx prisma generate && npx tsc

EXPOSE 5000

CMD ["npm", "start"]