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
            "bootstrap.css",
            "style.css",
            "style2.css"
            
        ],
        scripts:[
            "jquery.js",
            "handlebars.js",
            "socket.io.js",
            "chat.js",
        ],
        pictures:[
            "1.jpg",
            "2.jpg",
            "3.png"
        ]
    });
});
// io.on('connection', function(socket){
//     console.log("user conntected");
// });


server.listen(process.env.PORT || 8080, function(){
    console.log("uruchominy");
});
chatS(io);