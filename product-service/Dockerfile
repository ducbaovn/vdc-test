FROM node:12-alpine as base
ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /src
COPY . .

RUN npm install && npm run build

FROM base AS test
ENTRYPOINT ["npm", "test"]

FROM base AS app
EXPOSE 3000
CMD ["npm", "run", "start"]