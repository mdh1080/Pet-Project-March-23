const sequelize = require('../config/connection');
const { User, PostPet, Contact, Comment } = require('../models');

const userData = require('./userData.json');
const postpetData = require('./postpetData.json');
const commentData = require('./commentData.json')
const contactData = require('./contactData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const postpet of postpetData) {
    await PostPet.create({
      ...postpet,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
