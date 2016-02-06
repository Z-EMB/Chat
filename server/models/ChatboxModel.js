/**
 * Defintion of chat object
 */

module.exports = function() {
    var Chat = function(chatID) {
        this.chatID = chatID;
        this.log = this.getLog();
    };

    Chat.prototype.getLog = function() {
        return (this.log || []);
    };

    Chat.prototype.message = function(usr, msg) {
        this.log.push({
            uid: usr,
            msg: msg
        });

        if (this.log.length > 100) {
            this.log.shift();
        };
    };

    return Chat;
};
