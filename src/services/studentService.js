import { delay } from '../utils/delay.js';

// In-memory mock data for students.
// In a real app this would come from a backend / database.
let students = [
  { id: 1, name: 'Rahul Sharma', plan: 'Standard', status: 'Active', phone: '9876543210' },
  { id: 2, name: 'Priya Patel', plan: 'Premium', status: 'Active', phone: '9876543211' },
  { id: 3, name: 'Amit Desai', plan: 'Basic', status: 'Pending', phone: '9876543212' },
];

export async function getStudents() {
  await delay();
  // Return a shallow copy so callers cannot mutate the internal array by accident.
  return [...students];
}

export async function createStudent(payload) {
  await delay();
  const newStudent = {
    id: Date.now(),
    status: 'Active',
    ...payload,
  };
  students = [newStudent, ...students];
  return newStudent;
}

export async function updateStudent(id, updates) {
  await delay();
  students = students.map((student) =>
    student.id === id ? { ...student, ...updates } : student,
  );
  const updated = students.find((student) => student.id === id) ?? null;
  return updated;
}

export async function deleteStudent(id) {
  await delay();
  students = students.filter((student) => student.id !== id);
}

// Very small mock "login" for the student portal.
// Any non-empty id/password combination is accepted and mapped to a simple profile.
export async function loginStudent({ identifier, password }) {
  await delay(600);

  if (!identifier || !password) {
    throw new Error('Missing credentials');
  }

  // Try to find an existing mock student by phone or name for a slightly realistic feel.
  const existing =
    students.find(
      (student) => student.phone === identifier || student.name.toLowerCase() === identifier.toLowerCase(),
    ) ?? students[0];

  return {
    id: existing.id,
    name: existing.name,
    plan: existing.plan,
    status: existing.status,
  };
}

