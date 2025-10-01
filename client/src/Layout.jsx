import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <h1>New App</h1>
      </header>

      <div className="main">
        <nav>
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/tasks"><h2>Tasks</h2></Link>
        </nav>
      </div>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </>
  );
}

export default Layout;
