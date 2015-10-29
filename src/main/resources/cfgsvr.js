var Router = require("vertx-web-js/router");
var JWTAuth = require("vertx-auth-jwt-js/jwt_auth");
var JWTAuthHandler = require("vertx-web-js/jwt_auth_handler");
var StaticHandler = require("vertx-web-js/static_handler");
var ShellService = require("vertx-shell-js/shell_service");
var CommandBuilder = require("vertx-shell-js/command_builder");
var CommandRegistry = require("vertx-shell-js/command_registry");

var router = Router.router(vertx);

// Create a JWT Auth Provider
var jwt = JWTAuth.create(vertx, {
  "keyStore" : {
    "type" : "jceks",
    "path" : "keystore.jceks",
    "password" : "secret"
  }
});


var service = ShellService.create(vertx, {
   "telnetOptions" : {
    "host" : "localhost",
    "port" : 3001
  }
});

service.start(function (ar, ar_err) {
  console.log("start resp " + ar)
  if (!ar_err == null) {
    ar_err.printStackTrace();
  }
});


var builder = CommandBuilder.command("GetToken");
builder.processHandler(function (process) {

  // Write a message to the console
  process.write("your token: \n" + jwt.generateToken({ }, { "expiresInSeconds" : 600 }));
  process.write("\n");
  // End the process
  process.end();
});

// Register the command
var registry = CommandRegistry.get(vertx);
registry.registerCommand(builder.build());




// protect the API
router.route("/*").handler(JWTAuthHandler.create(jwt).handle);


// Serve the non private static pages
router.route().handler(StaticHandler.create().handle);

vertx.createHttpServer().requestHandler(router.accept).listen(8080);
