$(document).ready(function() {
    $('.sendButton').click(function() {
        //post ajax here with content from messageTextInput
        $.ajax({
            method: 'POST',
            url: '/message',
            data: { user: 'Default', message: 'kappa',
            dataType:'json'}
        });
    });

    $('.messageTextInput').keyup(function(event){
        if(event.keyCode == 13){
            $('.sendButton').click();
        }
    });
});
