const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = 'admin@nie.in';
const ADMIN_PASSWORD = 'password123';

const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  console.log("Admin login");

  if (!email || !password)
    return res.status(400).json({ msg: 'All fields are required' });

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: '2h',
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }
};

module.exports = { loginAdmin };
