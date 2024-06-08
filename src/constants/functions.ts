export const isValidEmail = (
  email: string
): email is `${string}@${string}.${string}` => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
