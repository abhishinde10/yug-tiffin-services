import { delay } from '../utils/delay.js';

// Shared mock data for parcel orders.
let parcelOrders = [
  { id: 1, studentName: 'Rahul Sharma', date: '2026-03-05', meal: 'Dinner', status: 'Packed' },
  { id: 2, studentName: 'Priya Patel', date: '2026-03-05', meal: 'Lunch', status: 'Booked' },
  { id: 3, studentName: 'Amit Desai', date: '2026-03-06', meal: 'Dinner', status: 'Cancelled' },
];

export async function getParcelOrders() {
  await delay();
  return [...parcelOrders];
}

export async function getParcelOrdersForStudent(studentName) {
  await delay();
  return parcelOrders.filter((order) => order.studentName === studentName);
}

export async function createParcelOrder({ studentName, date, meal, notes }) {
  await delay(700);
  const newOrder = {
    id: Date.now(),
    studentName,
    date,
    meal,
    status: 'Booked',
    notes: notes ?? '',
  };
  parcelOrders = [newOrder, ...parcelOrders];
  return newOrder;
}

export async function updateParcelStatus(id, status) {
  await delay(600);
  parcelOrders = parcelOrders.map((order) =>
    order.id === id ? { ...order, status } : order,
  );
  return parcelOrders.find((order) => order.id === id) ?? null;
}

export async function countParcelOrdersForThisWeek() {
  await delay();
  // For the demo we simply return the current length.
  return parcelOrders.length;
}

