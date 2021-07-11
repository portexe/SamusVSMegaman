import { Bar } from 'components';
import styles from './styles.module.css';

export const PlayerSummary = ({ name, level, health, maxHealth }) => (
  <div className={styles.main}>
    <div className={styles.info}>
      <div className={styles.name}>{name}</div>
      <div className={styles.level}>Lvl {level}</div>
    </div>

    <div className={styles.health}>
      <Bar label="HP" value={health} maxValue={maxHealth} />
    </div>
  </div>
);
