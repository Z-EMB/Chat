/**
 * Chatroom model.  Handles adding and removing users from the chatroom, and
 * keeps track of who is in the room.
 */
module.exports = function() {
	/**
	 * Constructor.
	 * @param {string} roomname
	 */
	var Chatroom = function(roomname) {
		this.name = roomname;
		this.users = {};
	};

	/**
	 * Get the name of this chatroom
	 * @return {string} roomname
	 */
	 Chatroom.prototype.getName = function() {
	 	return this.name;
	 };

	/**
	 * Get a list of usernames currently in the room.
	 * @return {Array} users
	 */
	Chatroom.prototype.getUsers = function() {
		return Object.keys(this.users);
	};

	/**
	 * Add a user to the room.
	 * @param {User} user
	 */
	Chatroom.prototype.add = function(user) {
		this.users[user.who] = user;
		user.join(this.name);
	};

	/**
	 * Remove a user from the room.
	 * @param {User} user
	 */
	Chatroom.prototype.remove = function(user) {
		delete this.users[user.who];
		user.leave();
	};

	/**
	 * Test if a specific username is in the room.
	 * @return {boolean}
	 */
	Chatroom.prototype.here = function(username) {
		return !!this.users[username];
	};

	return Chatroom;
};