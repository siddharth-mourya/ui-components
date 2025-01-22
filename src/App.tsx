import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Navbar from "./component/Navbar/Navbar";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.mainComponent}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/blog" Component={Blog} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
