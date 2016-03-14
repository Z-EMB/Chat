$(document).ready(function() {
    var socket = io();
//
    socket.emit('userConnect');

    socket.on('updateChat', function(username, message) {
        $('.chatWindow').append("<p> username: " + username +
            "Message: " + message + "</p>" );
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
        }
    });


    $('.messageTextInput').keyup(function(event){
        if(event.keyCode == 13){
            $('.sendButton').click();
        }
    });
});
