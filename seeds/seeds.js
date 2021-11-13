const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const collectionData = require('./collectionData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const collection of collectionData) {
    await Collection.create({
      ...collection,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const colData = await Collection.findAll({});

  const collect = colData.map((col) => col.get({ plain: true }));

  for (const item of itemData) {
      await Item.create({
          ...item,
          collection_id: collection[Math.floor(Math.random() * collect.length)].id,
      })
  }

  process.exit(0);
};

seedDatabase();
