$(document).ready(function() {
    var socket = io();
    var $chatWindow = $('.chatWindow');
    var $chatInput = $('.messageTextInput');
    var $uname = $('.login_username');

    //socket.emit('userConnect');

    $('.errorMsg').hide();
    var $loginBox = $('#LoginBoxContent');

    // set the width and height of the mask to cover the whole screen 
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var $mask = $('#mask'); 
    $mask.css({'width':maskWidth, 'height':maskHeight});
    $mask.fadeIn(500);
    $mask.fadeTo("slow",0.9);
    
    // gethe window width and height and set the popup to center in the window
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    $loginBox.css('top', windowHeight/2 - $loginBox.height() / 2);
    $loginBox.css('left', windowWidth/2 - $loginBox.width() / 2);
    $loginBox.fadeIn(2000);
    $uname.focus();

    // once the button is clicked
    $('.loginButton').click(function () {
        var username = $('.login_username').val();
        var chatroom = $('.login_chatroom').val();
        socket.emit('userConnect', username, chatroom);
        socket.on('ERROR', function(errorMsg) {
            $('.errorMsg').show();
        });
        socket.on('SUCCESS', function() {
            $(mask).hide();
            $('.window').hide();
            $chatInput.focus();
        });
    });

    
    socket.on('updateChat', function(username, message) {
        var chatMessage = "<p><strong>" + username + ":</strong> " + message + "</p>";
        if (username === 'EMF_HOST') {
            chatMessage = '<h4>' + chatMessage + '</h4>';
        }
        $chatWindow.append(chatMessage);
        $chatWindow[0].scrollTop = $chatWindow[0].scrollHeight;
    });

    socket.on('updateRooms', function(rooms) {
        var $lobbyWindow = $('.lobby');
        $lobbyWindow.empty();
        Object.keys(rooms).forEach(function(roomname) {
            var $room = $(document.createElement('h4'));
            $room.append(document.createTextNode(roomname));
            $lobbyWindow.append($room);
            $room.addClass('room');
            var userList = document.createElement('ul');
            $room.click(function() {
                console.log('Switch to ' + $room.text());
                socket.emit('switchRoom', $room.text());
            });
            var users = rooms[roomname];
            users.forEach(function(user) {
                $(userList).append("<li>"+user+"</li>");
            });
            $lobbyWindow.append(userList);
        });
    });

    function getMessageValue() {
        return $chatInput.val();
    }

    $('.sendButton').not('.loginButton').click(function() {
        if (getMessageValue()) {
            socket.emit('sendMessage', getMessageValue());
            $chatInput.val("");
        }
    });


    $chatInput.keyup(function(event) {
        if (event.keyCode == 13) {
            $('.sendButton').not('.loginButton').click();
        }
    });

    $('.login_username').keyup(function(event) {
        if (event.keyCode == 13) {
            $('.loginButton').click();
        }
    });

    $('.login_chatroom').keyup(function(event) {
        if (event.keyCode == 13) {
            $('.loginButton').click();
        }
    });
});
