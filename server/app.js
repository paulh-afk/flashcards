const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('MongoDB atlas URL');

const flashCardSchema = new mongoose.Schema({
  categories: {
    type: String,
  },
  img: {
    type: String,
  },
  titre: {
    type: String,
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
});

const FlashCard = mongoose.model('card', flashCardSchema);

app.post('/new', async (req, res, next) => {
  try {
    const { body } = req;
    const card = new FlashCard({
      titre: body.titre,
      contenu: body.contenu,
      img: '',
      categories: '',
    });
    await card.save();
    res.status(200).end();
  } catch (e) {
    next();
  }
});

app.get('/', async (req, res, next) => {
  try {
    const content = await FlashCard.find({}).exec();
    res.json(JSON.stringify(content)).status(200).end();
  } catch (e) {
    next();
  }
});

app.listen(5500);
