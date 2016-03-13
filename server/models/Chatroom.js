module.exports = function() {
	var Chatroom = function(roomname) {
		this.name = roomname;
		this.users = {};
	};

	Chatroom.prototype.getUsers = function() {
		return Object.keys(this.users);
	};

	Chatroom.prototype.add = function(user) {
		this.users[user.who] = user;
		user.join(this.name);
	};

	Chatroom.prototype.remove = function(user) {
		delete this.users[user.who];
		user.leave();
	};

	Chatroom.prototype.here = function(username) {
		return !!this.users[username];
	};

	return Chatroom;
};