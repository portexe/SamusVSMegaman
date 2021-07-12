import styles from './styles.module.css';

export const BattleMenu = ({ onAttack, onMagic, onHeal, onItem }) => (
  <div className={styles.main}>
    <div onClick={onAttack} className={styles.option}>
      Attack
    </div>
    <div className={styles.option}>Magic</div>
    <div className={styles.option}>Heal</div>
    <div className={styles.option}>Item</div>
  </div>
);
