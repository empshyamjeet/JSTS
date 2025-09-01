export const users = {
  validUser: { username: 'user1', password: 'pass1' },
  invalidUser: { username: 'user2', password: 'wrongPass' },
};

export function getRandomUser() {
  const names = ['user1', 'user2', 'user3'];
  return names[Math.floor(Math.random() * names.length)];
}
