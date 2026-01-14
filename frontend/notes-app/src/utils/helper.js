

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const getInitials = (name) => {
  if (!name) return "";

  // Trim spaces and split by one or more spaces
  const words = name.trim().split(/\s+/);
  let initials = "";

  // Loop for up to 2 words (or 1 if only one word)
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
