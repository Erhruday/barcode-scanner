import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li> */}
          {/* <li>
            <Link to="/pos">Pos</Link>
          </li> */}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
