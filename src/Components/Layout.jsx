function Layout({ children }) {
  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <div className="app-badge">
            <span className="app-badge-dot" />
            TinyLink • MERN URL Shortener
          </div>

          <div className="app-title-row">
            <div>
              <h1 className="app-title">AssignmentLink Dashboard</h1>
              <p className="app-subtitle">
                Create short links, track clicks, and manage them in one place.
              </p>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

export default Layout;
