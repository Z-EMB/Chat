$(document).ready(function() {
    $('.sendButton').click(function() {
        //post ajax here with content from messageTextInput

    });

    $('.messageTextInput').keyup(function(event){
        if(event.keyCode == 13){
            $('.sendButton').click();
        }
    });

});
