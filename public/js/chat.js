(function(){
   
   var socket = io.connect();
   var homePage=$("#home-page"),
   loginObcjet=$("#login"),
   avatarObject=$("#wybrany"),
   chatPage=$("#chat-room"),
   chatWindow=$("#chat-window"),
   statusWindow=$("#status-window"),
   messageObject=$("#message-text"),
   messagesWindow = Handlebars.compile( $("#messages-window").html() );
   activityWindow = Handlebars.compile( $("#activity-window").html() );
  
   homePage.on("submit", function(e){
      var login = $.trim( loginObcjet.val() );
      var avatar = $.trim( avatarObject.val() );


      if(login===""){
         alert("nie podano nazwy");
      
         //loginObcjet.addClass("empty");
      }
      else if(avatar===""){
         alert("nie wybrano avatara");
      } else{
         //loginObcjet.removeClass("invalid");
         socket.emit("join", login, avatar);
         
         homePage.hide();
         chatPage.show();
      }
     
      
   });


   chatPage.on("submit", function(e){
      e.preventDefault();
      var message = $.trim(messageObject.val());
      
      if(message!==""){
         socket.emit("message",message);
       //  messagesWindow.append(message);
         messageObject.val("");
      }
     
   });
   socket.on("status",function(data){
      var activityInfo = activityWindow({
         avatar: data.avatar,
         time: formatDate(data.time),
         login: data.login,
         status: data.status
      });
      statusWindow.append(activityInfo);

   });
   socket.on("message",function(data){
            var messageInfo = messagesWindow({
               avatar: data.avatar,
               time: formatDate(data.time),
               login: data.login,
               message : data.message
            });
           
        chatWindow.append(messageInfo);
   });
   function formatDate(time) {

      var date = new Date(time),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          seconds = date.getSeconds();

      return (hours < 10 ? "0" + hours : hours) + ":" +
          (minutes < 10 ? "0" + minutes : minutes) + ":" +
          (seconds < 10 ? "0" + seconds : seconds);

  }
})();
