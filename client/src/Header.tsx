import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <header>
        <nav className="navbar column-full">
          <span>Code Journal</span>
          <Link to="/entries" className="nav-item">
            Entries
          </Link>
          <Link to="/entry-form" className="nav-item">
            Entry Form
          </Link>
        </nav>
      </header>
      <Outlet></Outlet>
    </>
  );
}
