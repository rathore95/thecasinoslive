const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

const CASINOS_FILE = path.join(__dirname, 'casinos.json');

app.get('/api/casinos', (req, res) => {
  try {
    const data = fs.readFileSync(CASINOS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read casinos data' });
  }
});

app.post('/api/casinos', (req, res) => {
  try {
    const casinos = req.body;
    fs.writeFileSync(CASINOS_FILE, JSON.stringify(casinos, null, 2));
    res.json({ success: true, message: 'Casinos updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save casinos data' });
  }
});

app.delete('/api/casinos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = fs.readFileSync(CASINOS_FILE, 'utf8');
    let casinos = JSON.parse(data);
    casinos = casinos.filter(c => c.id !== id);
    fs.writeFileSync(CASINOS_FILE, JSON.stringify(casinos, null, 2));
    res.json({ success: true, message: 'Casino deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete casino' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
