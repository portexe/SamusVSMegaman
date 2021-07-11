import styles from './styles.module.css';

import { useState } from 'react';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';

export const App = () => {
  const playerStats = {
    level: 42,
    name: 'Mega Man',
    maxHealth: 177,
  };

  const { name, level, maxHealth } = playerStats;

  const [health, setHealth] = useState(maxHealth);

  // Input: attacker and the receiver
  // Output: new attacker and new receiver
  const attack = ({ attacker, receiver }) => {};

  // Input: receiver
  // Output: new receiver
  const heal = ({ receiver }) => {};

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            level={44}
            health={12}
            main={false}
            name={'Evil Person'}
            maxHealth={maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>Mega Man vs Samus</div>
        <div className={styles.gameImages}>
          <img alt="megaman" src="/assets/megaman.png" />
          <img alt="samus" src="/assets/samus.png" />
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={98}
            name={name}
            level={level}
            maxHealth={maxHealth}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer message={'What will Zaberu do?'} />
          </div>
          <div className={styles.hudChild}>
            <BattleMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
