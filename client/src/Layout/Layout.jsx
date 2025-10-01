import { Outlet, Link } from "react-router-dom";
import { content } from "./Layout.module.css";

function Layout() {
  return (
    <>
      <header>
        <h1>Task List App</h1>
      </header>

      <div className={ content }>
        <nav>
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/tasks">
            <h2>Tasks</h2>
          </Link>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>

      <footer></footer>
    </>
  );
}

export default Layout;
