import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>Cheetah UI</h1>
      <p>Welcome to the Home page</p>
    </div>
  );
};
export default Header;
