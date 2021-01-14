FROM node:12-alpine AS build
ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /src
COPY . .

RUN npm install && npm run build

FROM build as apitest
CMD ["npm", "run", "apitest"]

FROM build as unittest
CMD ["npm", "run", "unittest"]

FROM build AS app
EXPOSE 3000
CMD ["npm", "run", "start"]