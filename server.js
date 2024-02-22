const express = require('express');
const mongoose = require('mongoose');
const miniUrl = require('./models/miniUrls');
const app = express();

mongoose.connect('mongodb+srv://fantom:fantom123@nodecrashcourse.8ur7cr3.mongodb.net/minify-url?retryWrites=true&w=majority')
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  const miniUrls = await miniUrl.find();
  res.render('index', {miniUrls});
});

app.post('/shortUrls', async (req, res) => {
  await miniUrl.create({ OGUrl: req.body.OGUrl})

  res.redirect('/');
});

app.get('/:miniUrl', async (req, res) => {
  const MiniUrl = await miniUrl.findOne({ miniUrl: req.params.miniUrl});
  if (MiniUrl == null) return res.sendStatus(404);
  MiniUrl.Count++
  MiniUrl.save();
  res.redirect(MiniUrl.OGUrl);
});