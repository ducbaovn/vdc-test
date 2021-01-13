FROM node:12-alpine
ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /src
COPY . .

RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]