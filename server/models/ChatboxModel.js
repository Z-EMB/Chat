/**
 * Defintion of Chat Object -- models a chatroom
 */

module.exports = function() {
    /**
     * Constructor. Sample usage:
     * var room = new Chat('some_chat_ID');
     *
     * @param {string} chatID: a unique ID to be assigned to this chat
     */
    var Chat = function(chatID) {
        this.chatID = chatID;
        this.log = this.getLog();
    };

    /**
     * Chat.prototype.getLog() returns the current chat log
     */
    Chat.prototype.getLog = function() {
        return (this.log || []);
    };

    /**
     * Chat.prototype.message() adds a message to the chat log with a timestamp
     *
     * @param {string} usr: The user ID of the user sending the message
     * @param {string} msg: The message being sent
     * @return {Array} log: The updated chat log
     */
    Chat.prototype.message = function(usr, msg) {
        // add the message to the chat log
        this.log.push({
            uid: usr,
            msg: msg,
            time: Date.now()
        });

        // keep the log to the most recent 100 messages
        if (this.log.length > 100) {
            this.log.shift();
        };

        // return the updated log
        return this.log;
    };

    return Chat;
};
