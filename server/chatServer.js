function init(io){
    
    io.on("connection", function(socket){
       
        socket.on("join",function(login){
            socket.login = login;
            
            io.emit("status",{
                status: login +"dołaczył",
                time:Date.now()
                
            });
            
        });
        socket.on("disconnect", function(){
       
            console.log("opuscił");
               
                
                io.emit("status",{
                    status: socket.login +"opuscił",
                    time:Date.now()
                    
                });
                
            
           
           
        });
       
       
    });
  
}
module.exports = init;
