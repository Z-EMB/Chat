$(document).ready(function() {

    function showChat () {
    var Chat = require('/Chat/Server/models/ChatboxModel.js');
    var room = new Chat(1);

    var log = room.getLog();
}

});