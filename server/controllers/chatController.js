/**
 * Chat controller.  Manages users, rooms, and socket connections
 * @param {Service} io: socket.io service
 */
module.exports = function(io) {
	var User = require(global.models + '/User.js')();		// User model
	var Room = require(global.models + '/Chatroom.js')();	// Chatroom model

	var users = {};			// map of users
	var rooms = {};			// map of rooms
	var anonCounter = 0;	// counter for anon users
	var serverName = 'EMF_HOST';

	function createRoomUpdateData(rooms) {
		return Object.keys(rooms).reduce(function(data, roomname) {
			data[roomname] = rooms[roomname].getUsers();
			return data;
		}, {});
	}

	io.sockets.on('connection', function(socket) {	// Client connection
		
		// Client emits 'userConnect' ==> a user connects to our application
		socket.on('userConnect', function(_username, _roomname) {
			// if a username is provided, use that.  otherwise they are AnonymousN
			var username = (_username) ? _username : ('Anonymous' + (anonCounter++));

			// check if the username is available.  if not, stop here.  they will have to try again
			if (users[username]) {
				socket.emit('ERROR', 'That username is already taken.');
				return;
			}

			// init the user object and add them to the user map
			users[username] = new User(username, socket);

			// if a room is provided, they join that one.  otherwise, they go to default
			var roomname = (_roomname) ? _roomname : 'default';

			// create the room if it doesn't exist yet
			if (!rooms[roomname]) {
				rooms[roomname] = new Room(roomname);
			}

			// add them to the selected room and emit notifications
			rooms[roomname].add(users[username]);
			io.sockets.emit('updateRooms', createRoomUpdateData(rooms));
			socket.emit('updateChat', serverName, ('You have connected to room: ' + socket.roomname));
			socket.broadcast.to(socket.roomname)
				.emit('updateChat', serverName, ('User ' + username + ' has joined the room.'));
		});

		// Client emits 'sendMessage' ==> user sends a message to the chat
		socket.on('sendMessage', function(message) {
			io.sockets.in(socket.roomname).emit('updateChat', socket.username, message);
		});

		// Client emits 'switchRoom' ==> user switches chatrooms
		socket.on('switchRoom', function(roomname) {
			// remove the user from their old room
			var oldRoom = rooms[socket.roomname];
			var user = users[socket.username];
			oldRoom.remove(user);

			// if the new room doesn't exist, create it
			if (!rooms[roomname]) {
				rooms[roomname] = new Room(roomname);
			}

			// join the new room and send notifications
			rooms[roomname].add(user);
			io.sockets.emit('updateRooms', createRoomUpdateData(rooms));
			socket.emit('updateChat', serverName, 'You have connected to room: ' + roomname);
			socket.broadcast.to(oldRoom.getName())
				.emit('updateChat', serverName, (user.who() + ' has left the room.'));
			socket.broadcast.to(roomname)
				.emit('updateChat', serverName, (user.who() + ' has joined the room.'));
		});

		// Client disconnects
		socket.on('disconnect', function() {
			// remove user from room
			rooms[socket.roomname].remove(users[socket.username]);

			// remove user from the user map
			delete users[socket.username];

			// send notifications
			io.sockets.emit('updateRooms', createRoomUpdateData(rooms));
			socket.broadcast.to(socket.roomname)
				.emit('updateChat', serverName, (socket.username + ' has disconnected.'));
		});
	});
};
