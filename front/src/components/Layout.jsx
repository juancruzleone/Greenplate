// Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import Nav from './nav'
import { SessionProvider } from "../context/sessionContext.jsx"

const Layout = ({ children, ...rest }) => {
  return (
    <SessionProvider>
      <div {...rest}>
        <Nav/>
        {children}
      </div>
    </SessionProvider>
  );
};

export default Layout;
