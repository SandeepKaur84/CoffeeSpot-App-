export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 chars, one number, one special char
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
  return passwordRegex.test(password);
};
