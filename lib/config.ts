export const authConfig = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'changeme',
  email: process.env.ADMIN_EMAIL || 'admin@example.com'
};

export default {
  authConfig
};