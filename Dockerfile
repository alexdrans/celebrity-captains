FROM mhart/alpine-node AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --non-interactive
COPY tsconfig.json ./
COPY src src
COPY config config
RUN yarn build
RUN yarn --production --frozen-lockfile --non-interactive

FROM mhart/alpine-node
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN apk add --no-cache tini
COPY package.json yarn.lock ./
COPY --from=build /usr/src/app/node_modules node_modules/
COPY --from=build /usr/src/app/dist dist/
COPY --from=build /usr/src/app/config config/
COPY --from=build /usr/src/app/tsconfig.json tsconfig.json

ENTRYPOINT ["/sbin/tini", "--"]

EXPOSE 4000

CMD ["node", "dist/index.js"]
