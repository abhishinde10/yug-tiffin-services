import { delay } from '../utils/delay.js';

// Extremely small mock of an admin login.
// In a real backend this would verify credentials securely.
export async function loginAdmin({ email, password }) {
  await delay(600);

  if (!email || !password) {
    throw new Error('Missing admin credentials');
  }

  // Accept any non-empty credentials and return a simple profile.
  return {
    id: 1,
    name: 'Yug Mess Admin',
    email,
    role: 'admin',
  };
}

