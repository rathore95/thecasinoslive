const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'casino-admin-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const CASINOS_FILE = path.join(__dirname, 'casinos.json');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized. Please login.' });
}

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isAuthenticated = true;
    req.session.username = username;
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

app.get('/api/admin/check', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.json({ authenticated: true, username: req.session.username });
  } else {
    res.json({ authenticated: false });
  }
});

app.get('/api/casinos', (req, res) => {
  try {
    const data = fs.readFileSync(CASINOS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read casinos data' });
  }
});

app.post('/api/casinos', isAuthenticated, (req, res) => {
  try {
    const casinos = req.body;
    fs.writeFileSync(CASINOS_FILE, JSON.stringify(casinos, null, 2));
    res.json({ success: true, message: 'Casinos updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save casinos data' });
  }
});

app.delete('/api/casinos/:id', isAuthenticated, (req, res) => {
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

app.get('/admin.html', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.sendFile(path.join(__dirname, 'admin.html'));
  } else {
    res.redirect('/admin-login.html');
  }
});

app.use(express.static('.'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
