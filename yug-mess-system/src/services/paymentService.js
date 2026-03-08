import { delay } from '../utils/delay.js';

// Mock payment records used by both admin billing and student portal.
let payments = [
  { id: 1, studentName: 'Rahul Sharma', month: 'January', amount: 3500, status: 'Paid' },
  { id: 2, studentName: 'Rahul Sharma', month: 'February', amount: 3500, status: 'Paid' },
  { id: 3, studentName: 'Rahul Sharma', month: 'March', amount: 3500, status: 'Pending' },
  { id: 4, studentName: 'Priya Patel', month: 'March', amount: 3500, status: 'Paid' },
];

export async function getAllPayments() {
  await delay();
  return [...payments];
}

export async function getPaymentsForStudent(studentName) {
  await delay();
  if (!studentName) {
    // For first-time visitors we can still show a demo history.
    return payments.filter((payment) => payment.studentName === 'Rahul Sharma');
  }
  return payments.filter((payment) => payment.studentName === studentName);
}

export async function updatePaymentStatus(id, status) {
  await delay(600);
  payments = payments.map((payment) =>
    payment.id === id ? { ...payment, status } : payment,
  );
  return payments.find((payment) => payment.id === id) ?? null;
}

export async function calculateMonthlyIncome() {
  await delay();
  // Sum only "Paid" payments for a quick dashboard metric.
  const total = payments
    .filter((payment) => payment.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  return total;
}

export async function calculatePendingAmount() {
  await delay();
  const total = payments
    .filter((payment) => payment.status !== 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  return total;
}

