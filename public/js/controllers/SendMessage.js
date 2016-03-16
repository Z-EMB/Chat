$(document).ready(function() {
    var chatWindow = $('.chatWindow');

    $('.errorMsg').hide();
    var id = '#LoginBoxContent';
    // set the width and height of the mask to cover the whole screen 
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var mask = '#mask'; 
    $(mask).css({'width':maskWidth, 'height':maskHeight});
    $(mask).fadeIn(500);
    $(mask).fadeTo("slow",0.9);
    
    // gethe window width and height and set the popup to center in the window
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    $(id).css('top', windowHeight/2-$(id).height()/2);
    $(id).css('left', windowWidth/2-$(id).width()/2);
    $(id).fadeIn(2000);

    // once the button is clicked
    $('.loginButton').click(function () {
        var username = $('.login_username').val();
        var chatroom = $('.login_chatroom').val();
        $(mask).hide();
        $('.window').hide();
        var socket = io();
        socket.emit('userConnect',username,chatroom);

       // $('.errorMsg').show();
    });

    
    socket.on('updateChat', function(username, message) {
        if (username === 'EMF_HOST' ) {
            chatWindow.append("<p><b> username: " + username +
                " Message: " + message + "</b></p>" );
        }
        else {
           chatWindow.append("<p> username: " + username +
                " Message: " + message + "</p>" );
        }
        var height = chatWindow[0].scrollHeight;
        chatWindow.scrollTop(height);
        console.log('I have received the update event');
    });

    socket.on('updateRooms', function(rooms){
        var lobbyWindow = $('.lobby');
        lobbyWindow.empty();
        Object.keys(rooms).forEach(function(roomname) {
            lobbyWindow.append("<h4>"+roomname+"</h4>");
            var userList = document.createElement('ul');
            var users = rooms[roomname];
            users.forEach(function(user) {
                $(userList).append("<li>"+user+"</li>");
            });
            lobbyWindow.append(userList);
        });
        lobbyWindow.scrollTop(lobbyWindow.height());
    });

    function getMessageValue(){
        return $('.messageTextInput').val();
    }

    $('.sendButton').click(function() {
        if(getMessageValue()){
            socket.emit('sendMessage', getMessageValue());
            $('.messageTextInput').val("");
            var height = chatWindow[0].scrollHeight;
            chatWindow.scrollTop(height);
        }
    });

    $('.messageTextInput').keyup(function(event){
        if(event.keyCode == 13){
            $('.sendButton').click();
        }
    });
});
