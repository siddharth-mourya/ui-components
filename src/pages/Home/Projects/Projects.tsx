import ProjectCard from "../../../component/Projects/ProjectCard/ProjectCard";
import { PROJECTS } from "../../../util/constant";
import styles from "./Projects.module.scss";
const Projects = () => {
  return (
    <div className={styles.projectContainer}>
      <h2>Projects</h2>
      <p>Welcome to the Projects page</p>
      <ProjectCard projects={PROJECTS} />
    </div>
  );
};
export default Projects;
