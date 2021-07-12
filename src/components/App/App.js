import { useState } from 'react';
import styles from './styles.module.css';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';

export const App = () => {
  const player = {
    level: 44,
    maxHealth: 177,
    name: 'Mega Man',
    img: '/assets/megaman.png',

    magic: 32,
    attack: 44,
    defense: 48,
    magicDefense: 37,
  };
  const opponent = {
    level: 42,
    name: 'Samus',
    maxHealth: 188,
    img: '/assets/samus.png',

    magic: 55,
    attack: 48,
    defense: 22,
    magicDefense: 30,
  };

  const [health, setHealth] = useState(player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(opponent.maxHealth);

  // 0 -> Player's turn
  // 1 -> Opponent's turn
  // -1 -> Animating
  const [turn, setTurn] = useState(0);

  const [announcerMessage, setAnnouncerMessage] = useState(
    'What will Mega Man do?',
  );

  // Input: attacker and the receiver
  // Output: damage dealt
  const attack = ({ attacker, receiver }) => {
    const rawDamage = attacker.attack;
    const receivedDamage =
      rawDamage - (attacker.level - receiver.level) * 1.25;

    const finalDamage = receivedDamage - receiver.defense / 2;

    return finalDamage;
  };

  // Input: receiver
  // Output: health recovered
  const heal = ({ receiver }) => {};

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            main={false}
            health={opponentHealth}
            name={opponent.name}
            level={opponent.level}
            maxHealth={opponent.maxHealth}
          />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>Mega Man vs Samus</div>
        <div className={styles.gameImages}>
          <img alt={player.name} src={player.img} />
          <img alt={opponent.name} src={opponent.img} />
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main={true}
            health={health}
            name={player.name}
            level={player.level}
            maxHealth={player.maxHealth}
          />
        </div>

        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer message={announcerMessage} />
          </div>
          <div className={styles.hudChild}>
            <BattleMenu
              onAttack={() => {
                if (turn === 0) {
                  const damageDealt = attack({
                    attacker: player,
                    receiver: opponent,
                  });

                  const remainingHealth = opponentHealth - damageDealt;

                  /*
                    setTurn(-1);

                    animateAttack().then(() => {
                      setOpponentHealth(
                        remainingHealth > 0 ? remainingHealth : 0,
                      );

                      setTurn(1);
                    });
                  */

                  // We don't want a negative HP.
                  setOpponentHealth(
                    remainingHealth > 0 ? remainingHealth : 0,
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
