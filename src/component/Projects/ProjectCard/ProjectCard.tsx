import Card, { CardProps } from "../../shared/Card/Card";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  projects: Array<CardProps>;
}
const ProjectCard = ({ projects }: ProjectCardProps) => {
  return (
    <div className={styles.projectCards}>
      {projects.map((project) => {
        return (
          <Card
            title={project.title}
            imageSrc={project.imageSrc}
            description={project.description}
            link={project.link}
            linkLabel={project.linkLabel}
          />
        );
      })}
    </div>
  );
};
export default ProjectCard;
