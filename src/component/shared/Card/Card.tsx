import styles from "./Card.module.scss";

export interface CardProps {
  title: string;
  imageSrc: string;
  description?: string;
  link?: string;
  linkLabel?: string;
}

const Card = ({ title, imageSrc, description, link, linkLabel }: CardProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader}>
        <img src={imageSrc} alt={title} />
        <h2 className={styles.cardTitle}>{title}</h2>
      </div>
      <div className={styles.cardBody}>
        {description && <p className={styles.description}>{description}</p>}
        {link && (
          <a href={link} target="_blank">
            {">"} {linkLabel}
          </a>
        )}
      </div>
    </div>
  );
};
export default Card;
