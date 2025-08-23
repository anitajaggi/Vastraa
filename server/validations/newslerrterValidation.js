export const validateSubs = (req, res, next) => {
  const { email } = req.body;

  const errors = {};
  const trimmedEmail = email ? String(email).trim() : "";

  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.email = trimmedEmail;

  next();
};
