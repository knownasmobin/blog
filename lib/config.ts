export const authConfig = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  email: process.env.ADMIN_EMAIL
};

// Validate required environment variables in development
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    console.warn('Warning: ADMIN_USERNAME and ADMIN_PASSWORD environment variables must be set for admin functionality');
  }
}

export default {
  authConfig
};