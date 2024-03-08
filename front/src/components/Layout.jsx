import { SessionProvider } from "../context/sessionContext.jsx"
import Nav from './nav'

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
