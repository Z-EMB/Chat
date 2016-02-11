$(document).ready(function() {

    function getMessageValue(){
        return $('.messageTextInput').val();
    }

    function buildJSONRequest(){
        //will add user here for now default
        return JSON.stringify({requestValue:{user:'default',message:getMessageValue()}});
    }

    $('.sendButton').click(function() {
        var jsonData = buildJSONRequest();
        //post ajax here with content from messageTextInput
        $.ajax({
            method: 'POST',
            url: '/message',
            contentType:'application/json',
            data: jsonData
        }).done(function(res){
            console.log("post success");
        });
    });

    $('.messageTextInput').keyup(function(event){
        if(event.keyCode == 13){
            $('.sendButton').click();
        }
    });
});
