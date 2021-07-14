import {
  useAIOpponent,
  useBattleSequence,
  useSpriteAnimation,
} from 'hooks';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { opponentStats, playerStats } from 'shared';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';

export const App = () => {
  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence);

  const { playerSpriteClass, opponentSpriteClass } = useSpriteAnimation({
    styles,
    playerAnimation,
    opponentAnimation,
  });

  const aiChoice = useAIOpponent(turn);

  // This is running twice in most circumstances. For example:
  // 1: Turn updates -> effect runs
  // 2: Turn updates causing aiChoice to update -> effect runs
  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            main={false}
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>
        <div className={styles.gameImages}>
          <img
            alt={playerStats.name}
            src={playerStats.img}
            className={playerSpriteClass}
          />
          <img
            alt={opponentStats.name}
            src={opponentStats.img}
            className={opponentSpriteClass}
          />
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>
          {!inSequence && turn === 0 && (
            <div className={styles.hudChild}>
              <BattleMenu
                onHeal={() => setSequence({ mode: 'heal', turn })}
                onMagic={() => setSequence({ mode: 'magic', turn })}
                onAttack={() => setSequence({ mode: 'attack', turn })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
