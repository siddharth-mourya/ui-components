import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        Stem<span style={{ color: "white" }}>UI</span>
      </div>
      <ul className={styles.navItems}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
