$(document).ready(function() {
    var socket = io();

    function getMessageValue(){
        return $('.messageTextInput').val();
    }

    $('.sendButton').click(function() {
        socket.emit('sendMessage', getMessageValue());
    });

    $('.messageTextInput').keyup(function(event){
        if(event.keyCode == 13){
            $('.sendButton').click();
        }
    });
});
