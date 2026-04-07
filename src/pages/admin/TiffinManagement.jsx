import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function TiffinManagement() {
  const [date, setDate] = useState(() => {
    // defaults to today's date in DD-MM-YYYY
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  });

  // Date string needs to be converted for HTML input type="date" YYYY-MM-DD
  const htmlDateString = date.split('-').reverse().join('-');

  const handleDateChange = (e) => {
    const val = e.target.value; // YYYY-MM-DD
    if (val) {
      const [year, month, day] = val.split('-');
      setDate(`${day}-${month}-${year}`);
    }
  };

  const [activeTab, setActiveTab] = useState('none'); // 'none' -> ALL, 'pending' -> PENDING, 'received' -> RECEIVED
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add Student State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', mobile: '', Class: '' });

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/tiffin/records?date=${date}`);
      setRecords(response.data);
    } catch (error) {
      toast.error('Failed to fetch tiffin records.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, [date]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tiffin/students', newStudent);
      toast.success('Student Added Successfully!');
      setNewStudent({ name: '', mobile: '', Class: '' });
      setShowAddForm(false);
      // Wait a second and fetch records so the new record auto-generates
      fetchRecords();
    } catch (error) {
      toast.error('Failed to add student. ' + (error.response?.data?.message || ''));
    }
  };

  const handleGiveTiffin = async (recordId) => {
    try {
      await axios.put(`http://localhost:5000/api/tiffin/${recordId}/give`);
      toast.success('Tiffin Given!');
      fetchRecords();
    } catch (error) {
      toast.error('Action Failed');
    }
  };

  const handleMarkReceived = async (recordId) => {
    try {
      await axios.put(`http://localhost:5000/api/tiffin/${recordId}/receive`);
      toast.success('Tiffin Received!');
      fetchRecords();
    } catch (error) {
      toast.error('Action Failed');
    }
  };

  const filteredRecords = records.filter(r => r.status === activeTab);
  const allCount = records.filter(r => r.status === 'none').length;
  const pendingCount = records.filter(r => r.status === 'pending').length;
  const receivedCount = records.filter(r => r.status === 'received').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', gap: '1rem' }}>

      {/* 1. SINGLE ROW CONTROLS (Compact) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="dashboard-title" style={{ margin: 0, fontSize: '1.5rem' }}>Tiffin Tracking</h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="date"
            className="input-field styled-date"
            value={htmlDateString}
            onChange={handleDateChange}
            style={{ margin: 0, padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
          />
          <button
            className="btn btn-primary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Student'}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="card" style={{ padding: '1rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>Add New Tiffin Student</h2>
          <form onSubmit={handleAddStudent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr)) auto', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.8rem', fontWeight: 500 }}>Name</label>
              <input type="text" className="input-field" placeholder="Student Name" required style={{ padding: '0.35rem 0.6rem', margin: 0 }} value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.8rem', fontWeight: 500 }}>Mobile No.</label>
              <input type="text" className="input-field" placeholder="10 digit" required style={{ padding: '0.35rem 0.6rem', margin: 0 }} value={newStudent.mobile} onChange={e => setNewStudent({ ...newStudent, mobile: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.8rem', fontWeight: 500 }}>Details</label>
              <input type="text" className="input-field" placeholder="e.g. Engg/Poly" required style={{ padding: '0.35rem 0.6rem', margin: 0 }} value={newStudent.Class} onChange={e => setNewStudent({ ...newStudent, Class: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', height: '100%' }}>Save</button>
          </form>
        </div>
      )}

      {/* 2. COMPACT STATS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid var(--primary-color)' }}>
          <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Students</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{records.length}</div>
        </div>
        <div className="card" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #64748b' }}>
          <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Tiffin (Not Taken)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#64748b' }}>{allCount}</div>
        </div>
        <div className="card" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #ef4444' }}>
          <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Pending Return</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444' }}>{pendingCount}</div>
        </div>
        <div className="card" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '3px solid #10b981' }}>
          <div style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Received Safely</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>{receivedCount}</div>
        </div>
      </div>

      {/* 4. DOMINANT TABLE AREA */}
      <div className="card" style={{ flex: 1, overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>

        {/* COMPACT TABS */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <button
            type="button"
            style={{
              padding: '0.6rem 1.25rem', border: 'none', background: 'transparent', cursor: 'pointer', transition: 'all 0.2sease', fontSize: '0.85rem',
              borderBottom: activeTab === 'none' ? '2px solid #64748b' : '2px solid transparent',
              fontWeight: activeTab === 'none' ? '600' : '500',
              color: activeTab === 'none' ? '#334155' : '#94a3b8'
            }}
            onClick={() => setActiveTab('none')}
          >
            ALL STUDENTS ({allCount})
          </button>
          <button
            type="button"
            style={{
              padding: '0.6rem 1.25rem', border: 'none', background: 'transparent', cursor: 'pointer', transition: 'all 0.2sease', fontSize: '0.85rem',
              borderBottom: activeTab === 'pending' ? '2px solid #ef4444' : '2px solid transparent',
              fontWeight: activeTab === 'pending' ? '600' : '500',
              color: activeTab === 'pending' ? '#ef4444' : '#94a3b8'
            }}
            onClick={() => setActiveTab('pending')}
          >
            PENDING RETURN ({pendingCount})
          </button>
          <button
            type="button"
            style={{
              padding: '0.6rem 1.25rem', border: 'none', background: 'transparent', cursor: 'pointer', transition: 'all 0.2sease', fontSize: '0.85rem',
              borderBottom: activeTab === 'received' ? '2px solid #10b981' : '2px solid transparent',
              fontWeight: activeTab === 'received' ? '600' : '500',
              color: activeTab === 'received' ? '#10b981' : '#94a3b8'
            }}
            onClick={() => setActiveTab('received')}
          >
            RECEIVED ({receivedCount})
          </button>
        </div>

        {/* 7. SCROLLABLE CONTAINER */}
        <div style={{ overflowY: 'auto', flex: 1, position: 'relative' }}>
          {loading ? (
            <div className="loading-spinner-wrapper" style={{ minHeight: '150px' }}>
              <div className="spinner"></div>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="empty-state" style={{ minHeight: '150px' }}>
              <div className="empty-state-icon">📬</div>
              <h3>No records found</h3>
              <p>No students in this category today.</p>
            </div>
          ) : (
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <tr style={{ color: 'var(--text-light)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>Mobile</th>
                  <th style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>Class</th>
                  <th style={{ padding: '0.5rem 1rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.5rem 1rem', textAlign: 'right', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s', ':hover': { background: '#f8fafc' } }}>
                    <td data-label="Name" style={{ padding: '0.4rem 1rem', fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem' }}>{record.studentId?.name || 'Unknown'}</td>
                    <td data-label="Mobile" style={{ padding: '0.4rem 1rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>{record.studentId?.mobile || 'Unknown'}</td>
                    <td data-label="Class" style={{ padding: '0.4rem 1rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>{record.studentId?.Class || 'Unknown'}</td>
                    <td data-label="Status" style={{ padding: '0.4rem 1rem' }}>
                      {record.status === 'none' && <span className="badge" style={{ backgroundColor: '#64748b', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>ALL</span>}
                      {record.status === 'pending' && <span className="badge" style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>PENDING</span>}
                      {record.status === 'received' && <span className="badge" style={{ backgroundColor: '#10b981', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>RECEIVED</span>}
                    </td>
                    <td data-label="Action" style={{ padding: '0.4rem 1rem', textAlign: 'right' }}>
                      {/* 2. SHRINK BUTTONS */}
                      {record.status === 'none' && (
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}
                          onClick={() => handleGiveTiffin(record._id)}>
                          Give Tiffin
                        </button>
                      )}
                      {record.status === 'pending' && (
                        <button
                          className="btn"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#f59e0b', color: '#fff', border: 'none', transition: 'transform 0.15s', cursor: 'pointer' }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.03)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                          onClick={() => handleMarkReceived(record._id)}>
                          Mark Received
                        </button>
                      )}
                      {record.status === 'received' && (
                        <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          Returned
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TiffinManagement;
