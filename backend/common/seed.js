const db = require("../db-config");
const bcrypt = require("bcrypt");
const uuidGenerator = require("uuid");
const fs = require("fs");
const path = require("path");

const testData = {
  users: [
    {
      id: uuidGenerator.v4(),
      name: "Anna Schmidt",
      bio: "Anna ist eine leidenschaftliche Köchin und liebt es, neue Rezepte auszuprobieren.",
      stadt: "München",
      email: "anna.schmidt@example.com",
      password: "securepassword",
      firstName: "Anna",
      lastName: "Schmidt",
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/user-2.jpg",
        mimetype: "image/jpg",
        originalname: "user-2.jpg",
      },
    },
    {
      id: uuidGenerator.v4(),
      name: "Lukas Meier",
      bio: "Lukas ist ein begeisterter Musiker und spielt Gitarre in einer Band.",
      stadt: "Köln",
      email: "lukas.meier@example.com",
      password: "password123",
      firstName: "Lukas",
      lastName: "Meier",
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/user-1.jpg",
        mimetype: "image/jpg",
        originalname: "user-1.jpg",
      },
    },
    {
      id: uuidGenerator.v4(),
      name: "Maria Keller",
      bio: "Maria ist eine Buchliebhaberin und arbeitet als Bibliothekarin.",
      stadt: "Frankfurt",
      email: "maria.keller@example.com",
      password: "bibliophile",
      firstName: "Maria",
      lastName: "Keller",
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/user-3.jpg",
        mimetype: "image/jpg",
        originalname: "user-3.jpg",
      },
    },
    {
      id: uuidGenerator.v4(),
      name: "Johannes Becker",
      bio: "Johannes ist ein leidenschaftlicher Fotograf, der gerne Naturbilder macht.",
      stadt: "Stuttgart",
      email: "johannes.becker@example.com",
      password: "naturelover",
      firstName: "Johannes",
      lastName: "Becker",
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/user-4.jpg",
        mimetype: "image/jpg",
        originalname: "user-4.jpg",
      },
    },
    {
      id: uuidGenerator.v4(),
      name: "Clara Braun",
      bio: "Clara ist eine Softwareentwicklerin und liebt es, neue Technologien zu erkunden.",
      stadt: "Berlin",
      email: "clara.braun@example.com",
      password: "techguru",
      firstName: "Clara",
      lastName: "Braun",
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/user-5.jpg",
        mimetype: "image/jpg",
        originalname: "user-5.jpg",
      },
    },
  ],
  posts: [
    {
      id: uuidGenerator.v4(),
      text: "Loving the new album by The Midnight!",
      musicUrl: "https://example.com/music1.mp3",
      color: "#FFD700",
      emoji: "🎧",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-1.jpg",
        mimetype: "image/jpg",
        originalname: "posts-1.jpg",
      },
      musicArtist: "The Midnight",
      musicTitle: "Endless Summer",
    },
    {
      id: uuidGenerator.v4(),
      text: "Check out my latest cover song!",
      musicUrl: "https://example.com/music2.mp3",
      color: "#FF4500",
      emoji: "🎸",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-2.jpg",
        mimetype: "image/jpg",
        originalname: "posts-2.jpg",
      },
      musicArtist: "Lukas Meier",
      musicTitle: "Guitar Solo",
    },
    {
      id: uuidGenerator.v4(),
      text: "I just finished reading 'The Great Gatsby'. What a classic!",
      musicUrl: "https://example.com/music3.mp3",
      color: "#00FF7F",
      emoji: "📚",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-3.jpg",
        mimetype: "image/jpg",
        originalname: "posts-3.jpg",
      },
      musicArtist: "Scott Fitzgerald",
      musicTitle: "The Great Gatsby",
    },
    {
      id: uuidGenerator.v4(),
      text: "Captured an amazing sunset today!",
      musicUrl: "https://example.com/music4.mp3",
      color: "#FF69B4",
      emoji: "🌅",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-4.jpg",
        mimetype: "image/jpg",
        originalname: "posts-4.jpg",
      },
      musicArtist: "Nature",
      musicTitle: "Sunset Symphony",
    },
    {
      id: uuidGenerator.v4(),
      text: "Learning about the latest in AI technology. Exciting times!",
      musicUrl: "https://example.com/music5.mp3",
      color: "#8A2BE2",
      emoji: "🤖",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-5.jpg",
        mimetype: "image/jpg",
        originalname: "posts-5.jpg",
      },
      musicArtist: "Tech Innovators",
      musicTitle: "AI Revolution",
    },
    {
      id: uuidGenerator.v4(),
      text: "Had a great time hiking in the mountains this weekend.",
      musicUrl: "https://example.com/music6.mp3",
      color: "#32CD32",
      emoji: "⛰️",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-6.jpg",
        mimetype: "image/jpg",
        originalname: "posts-6.jpg",
      },
      musicArtist: "Nature Sounds",
      musicTitle: "Mountain Hike",
    },
    {
      id: uuidGenerator.v4(),
      text: "Exploring new cities is my favorite hobby!",
      musicUrl: "https://example.com/music7.mp3",
      color: "#FF6347",
      emoji: "🏙️",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-7.jpg",
        mimetype: "image/jpg",
        originalname: "posts-7.jpg",
      },
      musicArtist: "Urban Beats",
      musicTitle: "City Vibes",
    },
    {
      id: uuidGenerator.v4(),
      text: "Just finished a 10k run, feeling great!",
      musicUrl: "https://example.com/music8.mp3",
      color: "#1E90FF",
      emoji: "🏃‍♂️",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-8.jpg",
        mimetype: "image/jpg",
        originalname: "posts-8.jpg",
      },
      musicArtist: "Runner's High",
      musicTitle: "10k Beat",
    },
    {
      id: uuidGenerator.v4(),
      text: "Cooking a new dish tonight, can't wait to try it!",
      musicUrl: "https://example.com/music9.mp3",
      color: "#FFD700",
      emoji: "🍲",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-9.jpg",
        mimetype: "image/jpg",
        originalname: "posts-9.jpg",
      },
      musicArtist: "Kitchen Sounds",
      musicTitle: "Cooking Vibes",
    },
    {
      id: uuidGenerator.v4(),
      text: "Working on a new coding project, it's challenging but fun!",
      musicUrl: "https://example.com/music10.mp3",
      color: "#8A2BE2",
      emoji: "💻",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-10.jpg",
        mimetype: "image/jpg",
        originalname: "posts-10.jpg",
      },
      musicArtist: "Tech Tunes",
      musicTitle: "Coding Beats",
    },
    {
      id: uuidGenerator.v4(),
      text: "Started reading a new book, it's really intriguing!",
      musicUrl: "https://example.com/music12.mp3",
      color: "#32CD32",
      emoji: "📖",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-11.jpg",
        mimetype: "image/jpg",
        originalname: "posts-11.jpg",
      },
      musicArtist: "Bookworms",
      musicTitle: "Reading Time",
    },
    {
      id: uuidGenerator.v4(),
      text: "Just watched a great movie, highly recommend it!",
      musicUrl: "https://example.com/music13.mp3",
      color: "#FFD700",
      emoji: "🎬",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-12.jpg",
        mimetype: "image/jpg",
        originalname: "posts-12.jpg",
      },
      musicArtist: "Cinema Scores",
      musicTitle: "Movie Night",
    },
    {
      id: uuidGenerator.v4(),
      text: "Had an amazing dinner with friends tonight!",
      musicUrl: "https://example.com/music14.mp3",
      color: "#FF4500",
      emoji: "🍽️",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-13.jpg",
        mimetype: "image/jpg",
        originalname: "posts-13.jpg",
      },
      musicArtist: "Dinner Jazz",
      musicTitle: "Evening Feast",
    },
    {
      id: uuidGenerator.v4(),
      text: "Attended a live concert, the energy was incredible!",
      musicUrl: "https://example.com/music15.mp3",
      color: "#8A2BE2",
      emoji: "🎤",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-14.jpg",
        mimetype: "image/jpg",
        originalname: "posts-14.jpg",
      },
      musicArtist: "Live Band",
      musicTitle: "Concert Night",
    },
    {
      id: uuidGenerator.v4(),
      text: "Just finished a marathon, it was tough but rewarding!",
      musicUrl: "https://example.com/music16.mp3",
      color: "#1E90FF",
      emoji: "🏅",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-15.jpg",
        mimetype: "image/jpg",
        originalname: "posts-15.jpg",
      },
      musicArtist: "Endurance",
      musicTitle: "Marathon Journey",
    },
    {
      id: uuidGenerator.v4(),
      text: "Baked some homemade cookies today, they turned out great!",
      musicUrl: "https://example.com/music17.mp3",
      color: "#FFD700",
      emoji: "🍪",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-16.jpg",
        mimetype: "image/jpg",
        originalname: "posts-16.jpg",
      },
      musicArtist: "Baker's Delight",
      musicTitle: "Cookie Time",
    },
    {
      id: uuidGenerator.v4(),
      text: "Had a relaxing day at the spa, feeling rejuvenated!",
      musicUrl: "https://example.com/music18.mp3",
      color: "#FF69B4",
      emoji: "💆‍♀️",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-17.jpg",
        mimetype: "image/jpg",
        originalname: "posts-17.jpg",
      },
      musicArtist: "Relaxation",
      musicTitle: "Spa Sounds",
    },
    {
      id: uuidGenerator.v4(),
      text: "Had a great workout session at the gym today.",
      musicUrl: "https://example.com/music19.mp3",
      color: "#FF6347",
      emoji: "💪",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-18.jpg",
        mimetype: "image/jpg",
        originalname: "posts-18.jpg",
      },
      musicArtist: "Gym Beats",
      musicTitle: "Workout Mix",
    },
    {
      id: uuidGenerator.v4(),
      text: "Explored a new hiking trail, the views were breathtaking!",
      musicUrl: "https://example.com/music20.mp3",
      color: "#32CD32",
      emoji: "🥾",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-19.jpg",
        mimetype: "image/jpg",
        originalname: "posts-19.jpg",
      },
      musicArtist: "Nature Sounds",
      musicTitle: "Trail Adventures",
    },
    {
      id: uuidGenerator.v4(),
      text: "Just completed a challenging puzzle, feeling accomplished!",
      musicUrl: "https://example.com/music21.mp3",
      color: "#FFD700",
      emoji: "🧩",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-20.jpg",
        mimetype: "image/jpg",
        originalname: "posts-20.jpg",
      },
      musicArtist: "Brain Teasers",
      musicTitle: "Puzzle Fun",
    },
    {
      id: uuidGenerator.v4(),
      text: "Visited an art gallery, the exhibits were inspiring!",
      musicUrl: "https://example.com/music22.mp3",
      color: "#8A2BE2",
      emoji: "🎨",
      creatorId: null,
      file: {
        id: uuidGenerator.v4(),
        path: "./dummyImages/posts-21.jpg",
        mimetype: "image/jpg",
        originalname: "posts-21.jpg",
      },
      musicArtist: "Artistic Vibes",
      musicTitle: "Gallery Tour",
    },
  ],
};

async function addPost(post) {
  const uuid = uuidGenerator.v4();
  const fileId = await addFile(post.file);
  console.log(post.musicArtist, post.musicTitle, fileId);
  const insertQuery =
    "INSERT INTO post (id, text, musicUrl, color, emoji, creatorId, fileId, musicArtist, musicTitle) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?)";
  const insertParams = [
    uuid,
    post.text,
    post.musicUrl,
    post.color,
    post.emoji,
    post.creatorId,
    fileId,
    post.musicArtist,
    post.musicTitle,
  ];

  db.query(insertQuery, insertParams, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return { message: "Error inserting post data." };
    } else {
      const findQuery = "SELECT * FROM post WHERE id = ?";
      const params = [uuid];
      db.query(findQuery, params, async (err, findRes) => {
        return { message: "Create Post war erfolgreich.", ...findRes[0] };
      });
    }
  });
}

async function addUser(user) {
  //  Abfrage, um nach einer Email zu suchen
  const emailQuery = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
  const emailParams = [user.email];
  db.query(emailQuery, emailParams, async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return;
    } else if (result.length > 0) {
      return;
    } else {
      let salt = await bcrypt.genSalt();
      let hashedPassword = await bcrypt.hash(user.password, salt);

      const fileId = await addFile(user.file);
      // Einfügen neuer Benutzerdaten
      const insertQuery =
        "INSERT INTO user (id, name, bio, stadt, email, password, firstName, lastName, fileId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const insertParams = [
        user.id,
        user.name,
        user.bio,
        user.stadt,
        user.email,
        hashedPassword,
        user.firstName,
        user.lastName,
        fileId,
      ];

      db.query(insertQuery, insertParams, (err, result) => {
        if (err) {
          console.error("Insert error:", err);
          return;
        } else {
          const findQuery = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
          const params = [user.email];
          db.query(findQuery, params, async (err, findRes) => {
            const followuuid = uuidGenerator.v4();
            const insertQuery =
              "INSERT INTO follow (id,status, followerId, followedId) VALUES (? ,?, ?, ?)";
            const insertParams = [
              followuuid,
              "pending",
              findRes[0].user.id,
              findRes[0].user.id,
            ];

            db.query(insertQuery, insertParams, (err, result) => {
              if (err) {
                console.error("Insert error:", err);
                return;
              } else {
                const findQuery = "SELECT * FROM follow WHERE id = ?";
                const params = [followuuid];
                db.query(findQuery, params, async (err, lol) => {
                  console.log("created Follow");
                });
              }
            });

            return {
              message: "Die Registrierung war erfolgreich.",
              ...findRes[0],
            };
          });
          // Wenn neuer Nutzer erstellt, Registrierung abgeschlossen: Status 201 -> Created
        }
      });
    }
  });
}

async function addFile(file) {
  return new Promise(async (resolve, reject) => {
    const buffer = await getImageBuffer(file.path);
    const insertQuery = "INSERT INTO file SET ?";
    const values = {
      id: file.id,
      data: buffer,
      mimetype: file.mimetype,
      filename: file.originalname,
    };
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        reject({ message: "Error inserting File data." });
      } else {
        resolve(file.id);
      }
    });
  });
}

async function getImageBuffer(imagePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, imagePath), (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

async function seedDatabase() {
  console.log(testData.posts.length);
  try {
    for (const user of testData.users) {
      await addUser(user);
    }

    for (const post of testData.posts) {
      const randomUserIndex = Math.floor(Math.random() * testData.users.length);
      const randomUser = testData.users[randomUserIndex];
      post.creatorId = randomUser.id;
      await addPost(post);
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Database seeding error:", error);
  }
}

module.exports = { seedDatabase };
