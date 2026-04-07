import { useState, useEffect } from 'react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

function StudentManagement() {
  console.log("Student page loaded");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all students function
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/students');
      
      // Safety check: Make sure we got an array to avoid map crashes
      if (res.data && Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await api.delete(`/admin/delete-student/${id}`);
      toast.success('Student removed successfully');
      fetchStudents(); // Refresh after delete
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    }
  };

  return (
    <>
      <h1 className="dashboard-title">Student Management</h1>
      <p className="page-subtitle">Clean, safe version of the student directory.</p>

      {/* Basic Structure & Safe Rendering */}
      {loading ? (
        <div className="loading-spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No students found</h3>
          <p>There are currently no students in the directory.</p>
        </div>
      ) : (
        <div className="card" style={{ overflowX: 'auto', padding: '1rem' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Phone</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id || Math.random()} style={{ borderBottom: '1px solid #eee' }}>
                  <td data-label="Name" style={{ padding: '1rem' }}>{student.name || 'No Name'}</td>
                  <td data-label="Email" style={{ padding: '1rem' }}>{student.email || 'No Email'}</td>
                  <td data-label="Phone" style={{ padding: '1rem' }}>{student.phone || '-'}</td>
                  <td data-label="Role" style={{ padding: '1rem' }}>
                    <span className="badge badge-success" style={{ textTransform: 'capitalize' }}>
                      {student.role || 'student'}
                    </span>
                  </td>
                  <td data-label="Actions" style={{ padding: '1rem' }}>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="btn"
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: '1px solid #f87171',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.875rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default StudentManagement;
