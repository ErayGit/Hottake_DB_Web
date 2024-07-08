const express          = require('express');
const db = require('../db-config.js');


  const initDb = function () {
  console.log('[Database initialized]');
  return new Promise((resolve) => {
    
    db.query("CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`bio\` varchar(255) NULL, \`stadt\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`firstName\` varchar(255) NOT NULL DEFAULT '', \`lastName\` varchar(255) NOT NULL DEFAULT '', \`fileId\` varchar(255) NULL, INDEX \`IDX_32013feb275f7a0f41c451cd0d\` (\`createdAt\`), INDEX \`IDX_f2facb95edfc89041b6ed1fdbf\` (\`updatedAt\`), UNIQUE INDEX \`IDX_56211336b5ff35fd944f225917\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB", (err, results) => {
      if (err) {
        console.error('[User-Table already created]')
      } else {
        console.error('[User-Table created]')
      }
    });

    db.query("CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`text\` varchar(255) NOT NULL, \`musicUrl\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`emoji\` varchar(255) NOT NULL DEFAULT '👍', \`fileId\` varchar(255) NULL, \`creatorId\` varchar(255) NULL, INDEX \`IDX_32013feb275f7a0f41c451cd0d\` (\`createdAt\`), INDEX \`IDX_f2facbawefgh89041b6ed1fadf\` (\`updatedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB", (err, results) => {
      if (err) {
        console.error('[Post-Table already created]')
      } else {
        console.error('[Post-Table created]')
      }
    });

    db.query("CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`data\` longblob NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`filename\` varchar(255) NOT NULL, INDEX \`IDX_25bd99c3ae1d8493283e7b2c13\` (\`createdAt\`), INDEX \`IDX_5110e8dcb1cd5a9c268810618f\` (\`updatedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB", (err, results) => {
      if (err) {
        console.error('[File-Table already created]')
      } else {
        console.error('[File-Table created]')
      }
    });

    db.query("CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`text\` varchar(255) NOT NULL, \`emoji\` enum ('laughing', 'crying', 'prayer') NOT NULL DEFAULT 'laughing', \`creatorId\` varchar(255) NULL, \`postId\` varchar(255) NULL, INDEX \`IDX_25bd99c3123d849321237b2c13\` (\`createdAt\`), INDEX \`IDX_5110e8dcb1c12365468810618f\` (\`updatedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB", (err, results) => {
      if (err) {
        console.error('[Comment-Table already created]')
      } else {
        console.error('[Comment-Table created]')
      }
    });

    db.query("CREATE TABLE \`follow\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` enum ('pending', 'accepted') NOT NULL DEFAULT 'pending', \`followerId\` varchar(255) NULL, \`followedId\` varchar(255) NULL, INDEX \`IDX_25bd99cabc3d849bcd237b2c13\` (\`createdAt\`), INDEX \`IDX_5110e8dcb2324365468877718f\` (\`updatedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB", (err, results) => {
      if (err) {
        console.error('[Follow-Table already created]')
      } else {
        console.error('[Follow-Table created]')
      }
    });

    db.query("ALTER TABLE `user` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`fileId`) REFERENCES `file`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 1 or already exists]')
      }
    });
    db.query("ALTER TABLE `follow` ADD CONSTRAINT `FK_c28e523138e7bbc53828d339194` FOREIGN KEY (`followerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 2 or already exists]')
      }
    });
    db.query("ALTER TABLE `follow` ADD CONSTRAINT `FK_c28e523138e7abc53828d339194` FOREIGN KEY (`followedId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 3 or already exists]')
      }
    });
    db.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c28e523138e7ab777828d339194` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 4 or already exists]')
      }
    });
    db.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c28e52asd8e7ab777828d339194` FOREIGN KEY (`fileId`) REFERENCES `file`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 5 or already exists]')
      }
    });
    db.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_75343523138e7ab777828d339194` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 6 or already exists]')
      }
    });
    db.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_75343asd3138e7ab777828d339194` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE", (err, results) => {
      if (err) {
        console.error('[Could not create foreign constraint 7 or already exists]')
      }
    });
    db.query("ALTER TABLE `post` ADD COLUMN `musicArtist` varchar(255) NOT NULL", (err, results) => {
      if (err) {
        console.error('[Could not create Column musicArtist, already exists]')
      }
    });
    db.query("ALTER TABLE `post` ADD COLUMN `musicTitle` varchar(255) NOT NULL", (err, results) => {
      if (err) {
        console.error('[Could not create Column musicTitle, already exists]')
      }
    });
    resolve();

});
};

const timeout = function (){
  return new Promise(resolve => {
    initDb();
    resolve();
  });
}

module.exports = {timeout,initDb};


// async function initDb() {
//   try{
//     await setDB();
//   }
//   catch(err){
//     console.error(err);
//   }
// }

