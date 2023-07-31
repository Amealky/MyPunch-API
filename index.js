const express = require('express');
const api = express();


require("./middlewares")(api);
require("./settings")(api);
require("./models")(api);
require("./actions")(api);
require("./routes")(api);


    api.middlewares.syncData.syncGenres;

//console.log(`Api listening on port ${api.settings.port}`);
api.listen(api.settings.port);
