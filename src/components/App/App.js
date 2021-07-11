import styles from './styles.module.css';

import { useState } from 'react';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';

export const App = () => {
  const playerStats = {
    level: 42,
    name: 'PortEXE',
    maxHealth: 177,
  };

  const { maxHealth, level, name } = playerStats;

  const [health, setHealth] = useState(maxHealth);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={12}
            name={'Evil Person'}
            level={44}
            maxHealth={maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <img alt="megaman" src="/assets/megaman.png" />
        <img alt="samus" src="/assets/samus.png" />
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
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
