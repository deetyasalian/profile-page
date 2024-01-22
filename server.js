const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(express.static('public'));

const profiles = [];

app.post('/createProfile', (req, res) => {
  const { name, phoneNumber, photo } = req.body;
  const profile = { id: Date.now(), name, phoneNumber, photo };
  profiles.push(profile);
  res.redirect('/');
});

app.get('/getProfiles', (req, res) => {
  res.json(profiles);
});

app.delete('/deleteProfile/:id', (req, res) => {
  const profileId = parseInt(req.params.id);
  const index = profiles.findIndex(profile => profile.id === profileId);

  if (index !== -1) {
    profiles.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Profile not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
