import { useState } from "react";
import Popover from "../../component/shared/Popover/Popover";
import SearchInput from "../../component/shared/SearchInput/SearchInput";
import styles from "./Popover.module.scss";

const Home = () => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={styles.popoverContainer}>
      <Popover
        placement="bottom"
        onOpenChange={(popoverOpen) => console.log(popoverOpen)}
      >
        <SearchInput onSearch={onSearch} />
      </Popover>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button>Button</button>
    </div>
  );
};
export default Home;
