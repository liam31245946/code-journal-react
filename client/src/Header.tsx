import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <header>
        <nav className="navbar column-full">
          <span>Code Journal</span>
          <Link to="/" className="nav-item">
            Entries
          </Link>
        </nav>
      </header>
      <Outlet></Outlet>
    </>
  );
}
