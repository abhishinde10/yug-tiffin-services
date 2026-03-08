import { delay } from '../utils/delay.js';

// Simple in-memory store for daily menus keyed by ISO date string.
const menusByDate = new Map();

// Seed with a "today" menu so both admin and student dashboards
// show something meaningful on first load.
function seedTodayMenu() {
  const today = new Date().toISOString().slice(0, 10);
  if (!menusByDate.has(today)) {
    menusByDate.set(today, {
      date: today,
      lunchItems: ['4 Roti / Chapati', 'Dal Tadka', 'Steamed Rice', 'Mix Veg Sabji', 'Salad & Pickle'],
      dinnerItems: ['4 Chapati', 'Paneer Butter Masala', 'Jeera Rice', 'Dal Fry', 'Papad & Chutney'],
    });
  }
}

seedTodayMenu();

export async function getMenuByDate(date) {
  await delay();
  const key = date || new Date().toISOString().slice(0, 10);
  const existing = menusByDate.get(key);

  if (existing) {
    return { ...existing };
  }

  // Fallback empty menu for dates that have not been configured yet.
  return {
    date: key,
    lunchItems: [],
    dinnerItems: [],
  };
}

export async function saveMenu({ date, lunchItems, dinnerItems }) {
  if (!date) {
    throw new Error('Date is required to save a menu.');
  }

  await delay(700);

  const record = {
    date,
    lunchItems: lunchItems ?? [],
    dinnerItems: dinnerItems ?? [],
  };

  menusByDate.set(date, record);
  return { ...record };
}

