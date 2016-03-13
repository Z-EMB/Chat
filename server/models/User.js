module.exports = function() {
	var User = function(username, socket) {
		socket.username = username;
		this.socket = socket;
	};

	User.prototype.join = function(roomname) {
		this.socket.join(roomname);
		this.socket.roomname = roomname;
	};

	User.prototype.leave = function() {
		this.socket.leave(this.socket.roomname);
		this.socket.roomname = '';
	};

	User.prototype.who = function() {
		return this.socket.username;
	};

	User.prototype.where = function() {
		return this.socket.roomname;
	};

	return User;
};