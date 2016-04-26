$(document).ready(function() {
    var socket = io();
    var $chatWindow = $('.chatWindow');
    var $chatInput = $('.messageTextInput');
    var $uname = $('.login_username');
    var $container = $('.browserChatView');
    var dragEvents = 'drag dragstart dragend dragover dragenter dragleave drop';
    var userColors = {};

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
            userColors[username] = genHexColor();
            $(mask).hide();
            $('.window').hide();
            $chatInput.focus();
        });
    });

    function genHexColor(){
        return '#'+Math.random().toString(16).slice(2,8);
    }

    function getUserColor(username){
        var uc;
        if(!userColors[username]){
            userColors[username] = genHexColor();
            uc = userColors[username];
        }else{
            uc = userColors[username];
        }
        return uc;
    }

    socket.on('updateChat', function(username, message) {
        var chatMessage = "<p><strong style=\"color:"+getUserColor(username)+"\">" + username + "</strong>: " + message + "</p>";
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
                $(userList).append("<li style=\"color:"+getUserColor(user)+"\">"+user+"</li>");
            });
            $lobbyWindow.append(userList);
        });
    });

    $('.sendButton').click(function() {
        if ($chatInput.val()) {
            socket.emit('sendMessage', $chatInput.val());
            $chatInput.val("");
        }
    });

    $('.createRoom').click(function() {
        if($('.roomName').val().length <= 10 && $('.roomName').val().length !== 0){
            socket.emit('switchRoom', $('.roomName').val());
        }
    });

    $chatInput.keyup(function(event) {
        if (event.keyCode == 13) {
            $('.sendButton').click();
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

    $container.on(dragEvents, function(e) {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', function() {
        $chatWindow.addClass('add');
    })
    .on('dragleave dragend drop', function() {
        $chatWindow.removeClass('add');
    })
    .on('drop', function(e) {
        // handle drop
        file = e.originalEvent.dataTransfer.files[0];
        if (file.size > 1048576) {
            alert('Whoa dude, that\'s like... a really big file.  Try something under 1 meg.');
        } else {
            var stream = ss.createStream();
            ss(socket).emit('file', stream, {
                size: file.size,
                name: file.name,
                isImage: file.type.includes('image')
            });
            ss.createBlobReadStream(file).pipe(stream);
        }
    });
});
