require("dotenv").config();
var cors = require('cors')
const express = require("express");


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";

        this.middlewares();

        this.router();
    }

    middlewares(){
        this.app.use(cors());

        //lectura y parseo body
        this.app.use(express.json());
        
        this.app.use(express.static("public"));
    }

    router(){
        this.app.use(this.usersPath, require("../routes/user.routes"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
          });
        }
}

module.exports = Server;