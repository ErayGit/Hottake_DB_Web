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
          console.log(results);
          console.log(post);
          server.ioSocket.sockets.emit('notify', {followers: results, post: post.post})
        }
      })
    }
  }
}
