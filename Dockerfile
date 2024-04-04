FROM node:21 as BUILDER

WORKDIR /app

COPY package.json ./

RUN npm install  --frozen-lockfile

COPY . .

RUN npm run build; \
  npm install --production --prefer-offline

FROM node:21 as PRODUCTION

WORKDIR /app

COPY --from=BUILDER /app/package.json ./
COPY --from=BUILDER /app/dist ./dist
COPY --from=BUILDER /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
