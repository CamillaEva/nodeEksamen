import bcrypt from 'bcrypt';

export async function hashedPassword (password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function comparePassword (passwordComparison, hashedPassword) {
  const passwordIsSame = await bcrypt.compare(passwordComparison, hashedPassword);

  return passwordIsSame;
}
