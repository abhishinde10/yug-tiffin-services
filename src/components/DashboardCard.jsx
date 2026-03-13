function DashboardCard({ label, value, subtext, icon, accent = 'green' }) {
  return (
    <div className={`card card-stat card-accent-${accent}`}>
      <div className="card-header-row">
        <div>
          <div className="card-label">{label}</div>
          <div className="card-value">{value}</div>
        </div>
        {icon ? <div className="card-icon-badge">{icon}</div> : null}
      </div>
      {subtext ? <div className="card-subtext">{subtext}</div> : null}
    </div>
  )
}

export default DashboardCard

