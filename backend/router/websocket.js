const server = require('../server');
const db = require('../db-config');

module.exports = {
  notifyFollowers: (posterId, post) => {
    if(server.ioSocket != null) {
      const query = 'SELECT followerId FROM follow WHERE followedId = ?';
      const params = [posterId];
      db.query(query, params, (err, results) => {
        if (err) {
          console.error('Database error:', err);
        } else {
          const intersection = [];
          server.userSocketMap.forEach((value, key) => {
            results.forEach((result) => {
              if(result.follow.followerId === key) {
                intersection.push(value);
              }
            })
          });
          intersection.forEach((socketId) => {
            server.ioSocket.sockets.to(socketId).emit('notify', {post: post.post})
          });
        }
      })
    }
  }
}
