const mongoose = require('mongoose');
const config = require('./config');
const Place = require('./models/Place');
const Comment = require('./models/Comment');
const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

const [user,admin] =  await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  displayName:'User',

  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  displayName:'Антон Пикачу',
    token: nanoid(),

  },{
  username: 'jon',
  password: '123',
  displayName:'Jon',
  role: 'user',
  token: nanoid(),

});
  const [place1, place2, place3] = await Place.create({
    name: 'Market',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    user: user,
    commentCount: 4,
    easyToMake: 20,
    quickToMake: 20,
    taste: 20,
    image: '../uploads/market2.jpeg',
  }, {
    name: 'Market',
    description: 't has survived not only five centuries, but also the leap into electronic' +
        ' typesetting, remaining essentially unchanged. It was popularised in the 196',
    user: admin,
    commentCount: 3,
    easyToMake: 15,
    quickToMake: 15,
    taste: 15,
    image: '../uploads/market.jpg',
  }, {
    name: 'market',
    description: 't has survived not only five centuries, but also' +
        ' the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 196',
    user: user,
    commentCount: 2,
    easyToMake: 10,
    quickToMake: 10,
    taste: 10,
    image: '../uploads/market.jpg',

  });
  await Comment.create({
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
    recipe: place1,
    easyToMake: 4.0,
    quickToMake: 4.0,
    taste: 4.0,
    user: admin
  }, {
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
    recipe: place2,
    easyToMake: 5.0,
    quickToMake: 3.0,
    taste: 5.0,
    user:user
  }, {
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
        " printer took a galley of type and scrambled it to make a type specimen book. o nobis?",
    recipe: place2,

    user: user
  }, {
    comment: "Lorem ipsum dolor sit amet, Lorem Ipsum is simply dummy te" +
        "xt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard " +
        "dummy text ever since the 1500s, when an " +
        "unknown printer took a galley of type and scrambled it to make a type specimen book.onsectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
    recipe: place3,

    user: admin
  }, {
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" +
        " has been the industry's standard dummy text ever since the 1500s, when an unknown printer" +
        " took a galley of type and scrambled it to make a type specimen book.",
    recipe: place3,

    user: user
  }, {
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolorum fugiat fugit, libero nobis?",
    recipe: place3,

    user: admin
  });
  mongoose.connection.close();
};



run().catch(e => {
  mongoose.connection.close();
  throw e;
});