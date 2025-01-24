import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <nav>
        {/* <div className={styles.logo}>
        <span>
          Cheetah-<span style={{ color: "white" }}>UI</span>
        </span>
      </div> */}
        <ul className={styles.navItems}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
