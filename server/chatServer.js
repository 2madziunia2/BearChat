function init(io){
    
    io.on("connection", function(socket){
       
        socket.on("join",function(login,avatar){
            socket.login = login;
            socket.avatar = avatar;
         
            io.emit("status",{
                status:"dołaczył / dołączyła do chatu",
                time:Date.now(),
                avatar: socket.avatar,
                login:login
                
            });
           
            
        });
        socket.on("disconnect", function(){
             if(socket.login != undefined)
               { io.emit("status",{
                    status:"opuścił / opuściła czat ",
                    time:Date.now(),
                    avatar: socket.avatar,
                    login:socket.login
               
                });
            }
        });       
        socket.on("message", function(msg){
           
            io.emit("message",{
                avatar: socket.avatar,
                login: socket.login,
                time : Date.now(),
                message : msg,
                
               
            });
           
         });
       
       
    });
  
}
module.exports = init;
