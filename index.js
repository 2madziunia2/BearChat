const express = require("express");
const app = express();
const server = require("http").Server(app);
//const hbs = require("express-handlebars");
const {engine} = require("express-handlebars");
const io = require("socket.io")(server);
const chatS = require("./server");

app.engine("handlebars", engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use( express.static("public") );

app.get('/',  function(req,res){
    res.render('home',{
        title: " Chat - Node.js",
        styles:[
            "style.css",
            "style2.css"
        ],
        scripts:[
            "socket.io.js",
            "jquery.js",
            "chat.js",
        ]
    });
});
io.on('connection', function(socket){
    console.log("user conntected");
});
io.on('disconnection', function(socket){
    console.log("disconecct");
});

server.listen(process.env.PORT ||8080, function(){
    console.log("uruchominy");
});
chatS(io);