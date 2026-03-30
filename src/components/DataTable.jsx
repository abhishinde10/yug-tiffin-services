function DataTable({ columns, rows }) {
  return (
    <div className="table-wrapper">
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 1rem' }}>No data available</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id ?? JSON.stringify(row)}>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
