import { Bar } from 'components';
import styles from './styles.module.css';

export const PlayerSummary = ({
  main,
  name,
  level,
  health,
  maxHealth,
}) => (
  <div
    style={{ backgroundColor: !main ? '#1953cb' : '#821400' }}
    className={styles.main}
  >
    <div className={styles.info}>
      <div className={styles.name}>{name}</div>
      <div className={styles.level}>Lvl {level}</div>
    </div>

    <div className={styles.health}>
      <Bar label="HP" value={health} maxValue={maxHealth} />
    </div>
  </div>
);
