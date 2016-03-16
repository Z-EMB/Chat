$(document).ready(function() {
    var socket = io();
    var $chatWindow = $('.chatWindow');
    var $chatInput = $('.messageTextInput');

    socket.emit('userConnect');
    $chatInput.focus();

    socket.on('updateChat', function(username, message) {
        var chatMessage = "<p><strong>" + username + ":</strong> " + message + "</p>";
        if (username === 'EMF_HOST') {
            chatMessage = '<h4>' + chatMessage + '</h4>';
        }
        $chatWindow.append(chatMessage);
        $chatWindow[0].scrollTop = $chatWindow[0].scrollHeight;
    });

    socket.on('updateRooms', function(rooms) {
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
    });

    function getMessageValue() {
        return $chatInput.val();
    }

    $('.sendButton').click(function() {
        if (getMessageValue()) {
            socket.emit('sendMessage', getMessageValue());
            $chatInput.val("");
        }
    });


    $chatInput.keyup(function(event) {
        if (event.keyCode == 13) {
            $('.sendButton').click();
        }
    });
});
