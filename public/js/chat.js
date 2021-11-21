(function(){
   
   var socket = io.connect();
   var homePage=$("#home-page"),
   loginObcjet=$("#login");

   homePage.on("submit", function(e){
      e.preventDefault();
      var login = $.trim( loginObcjet.val() );
      console.log(login);
      socket.emit("join", login);
   });
})();
