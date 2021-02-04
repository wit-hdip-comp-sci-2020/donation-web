"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Handlebars = require("handlebars");
const Cookie = require("@hapi/cookie");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.bind({
  users: {},
  currentUser: {},
  donations: [],
});

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "donation",
      password: "password-should-be-32-characters",
      isSecure: false,
    },
  });
  server.auth.default("session");
  server.route(require("./routes"));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
