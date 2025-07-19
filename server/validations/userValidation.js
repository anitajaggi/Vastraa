export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = {};
  const trimmedEmail = email ? String(email).trim() : "";
  const trimmedPassword = password ? String(password).trim() : "";

  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!trimmedPassword) {
    errors.password = "Password is required.";
  } else if (trimmedPassword.length < 4) {
    errors.password = "Password must be at least 4 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.email = trimmedEmail;
  req.body.password = trimmedPassword;

  next();
};

export const validateRegister = (req, res, next) => {
  const { username, email, phone, password } = req.body;

  const errors = {};
  const trimmedUsername = username ? String(username).trim() : "";
  const trimmedEmail = email ? String(email).trim() : "";
  const trimmedPhone = phone != null ? String(phone).trim() : "";
  const trimmedPassword = password ? String(password).trim() : "";

  if (!trimmedUsername) {
    errors.username = "Username is required.";
  } else if (trimmedUsername.length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  }

  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!trimmedPhone) {
    errors.phone = "Phone number is required.";
  } else {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  if (!trimmedPassword) {
    errors.password = "Password is required.";
  } else if (trimmedPassword.length < 4) {
    errors.password = "Password must be at least 4 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.username = trimmedUsername;
  req.body.email = trimmedEmail;
  req.body.phone = trimmedPhone;
  req.body.password = trimmedPassword;

  next();
};
