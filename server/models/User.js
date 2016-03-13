/**
 * User model.  A thin wrapper around the user's socket connection.
 */
module.exports = function() {
	/**
	 * Constructor.
	 * @param {string} username
	 * @param {Socket} socket: the socket connection associated with this user
	 */
	var User = function(username, socket) {
		socket.username = username;
		this.socket = socket;
	};

	/**
	 * Join a chatroom.
	 * @param {string} roomname: the name of the room to join
	 */
	User.prototype.join = function(roomname) {
		this.socket.join(roomname);
		this.socket.roomname = roomname;
	};

	/**
	 * Leave the current chatroom.
	 */
	User.prototype.leave = function() {
		this.socket.leave(this.socket.roomname);
		this.socket.roomname = '';
	};

	/**
	 * Who is this user?
	 * @return {string} username
	 */
	User.prototype.who = function() {
		return this.socket.username;
	};

	/**
	 * Where is this user?
	 * @return {string} roomname
	 */
	User.prototype.where = function() {
		return this.socket.roomname;
	};

	return User;
};