(function(){
   
   var socket = io.connect();
   var isJoined = false;
   var homePage=$("#home-page"),
   loginObcjet=$("#login"),
   avatarObject=$("#wybrany"),
   chatPage=$("#chat-room"),
   chatWindow=$("#chat-window"),
   statusWindow=$("#status-window"),
   messageObject=$("#message-text"),
   emptyValue=$("#empty"),
   messagesWindow = Handlebars.compile( $("#messages-window").html() );
   activityWindow = Handlebars.compile( $("#activity-window").html() );
  
   homePage.on("submit", function(e){
      e.preventDefault();

      var login = $.trim( loginObcjet.val() );
      var avatar = $.trim( avatarObject.val() );

      if(login===""){
         var text = "Misiu podaj Login";
         emptyValue.empty().append(text);
     
      }
      else if(avatar===""){
         var text = "Misiu wybierz avatar";
         emptyValue.empty().append(text);
      } else{
        
         socket.emit("join", login, avatar);
         homePage.hide();
         chatPage.show();
         isJoined = true;
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
      if(!isJoined) return;
      var activityInfo = activityWindow({
         avatar: data.avatar,
         time: formatDate(data.time),
         login: data.login,
         status: data.status
      });
      statusWindow.append(activityInfo);
      scrollWindow();
   });
   socket.on("message",function(data){
      if(!isJoined) return;
            var messageInfo = messagesWindow({
               avatar: data.avatar,
               time: formatDate(data.time),
               login: data.login,
               message : data.message
            });
           
        chatWindow.append(messageInfo);
        scrollWindow();
   });
   function scrollWindow(){
      chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
      statusWindow.scrollTop(statusWindow.prop("scrollHeight"));
   }
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
