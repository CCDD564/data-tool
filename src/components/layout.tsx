import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
