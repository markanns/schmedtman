import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav";
import Logo from "../components/Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}></p>
      </footer>
    </div>
  );
}

export default Sidebar;
