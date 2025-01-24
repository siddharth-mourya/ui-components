import useScrollDownButton from "../../hooks/useScrollDownButton";
import Header from "./Header/Header";
import styles from "./Home.module.scss";
import Projects from "./Projects/Projects";
const Home = () => {
  const { topRef, belowRef, isVisible } = useScrollDownButton();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerContainer} ref={topRef}>
        <Header />
        {isVisible && (
          <div className={styles.downIcon}>
            <button>down</button>
          </div>
        )}
      </div>
      <div ref={belowRef}>
        <Projects />
      </div>
      <br />
    </div>
  );
};
export default Home;
