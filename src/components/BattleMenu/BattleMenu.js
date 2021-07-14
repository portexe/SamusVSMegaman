import styles from './styles.module.css';

export const BattleMenu = ({ onAttack, onMagic, onHeal }) => (
  <div className={styles.main}>
    <div onClick={onAttack} className={styles.option}>
      Attack
    </div>
    <div onClick={onMagic} className={styles.option}>
      Magic
    </div>
    <div onClick={onHeal} className={styles.option}>
      Heal
    </div>
  </div>
);
