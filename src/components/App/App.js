import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { wait, heal, magic, attack, player, opponent } from 'shared';
import { BattleMenu, PlayerSummary, BattleAnnouncer } from 'components';

export const App = () => {
  const [health] = useState(player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(opponent.maxHealth);

  // 0 -> Player's turn
  // 1 -> Opponent's turn
  // -1 -> Animating (AKA disable le buttons)
  const [turn, setTurn] = useState(0);

  const [announcerMessage, setAnnouncerMessage] = useState(
    `What will ${player.name} do?`,
  );

  const [playerSpriteClass, setPlayerSpriteClass] = useState(
    styles.sprite,
  );
  const [opponentSpriteClass, setOpponentSpriteClass] = useState(
    styles.sprite,
  );

  // Triggered when it becomes the opponent's turn
  useEffect(() => {
    if (turn === 1) {
      /**
        1. Randomly choose between attack, heal, or magic
        2. Calculate the amount of damage or recovery
        3. Begin the sequence
        4. Switch to player's turn
      */

      const options = ['attack', 'heal', 'magic'];
      const chosenOption =
        options[Math.floor(Math.random() * options.length)];
    }
  }, [turn]);

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
          <img
            alt={player.name}
            src={player.img}
            className={playerSpriteClass}
          />
          <img
            alt={opponent.name}
            src={opponent.img}
            className={opponentSpriteClass}
          />
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
          {turn === 0 && (
            <div className={styles.hudChild}>
              <BattleMenu
                onMagic={async () => {
                  setTurn(-1);
                  setAnnouncerMessage(`${player.name} has cast a spell!`);

                  await wait(1000);

                  setPlayerSpriteClass(styles.doingMagic);

                  await wait(1000);

                  setPlayerSpriteClass(styles.sprite);

                  await wait(500);

                  setOpponentSpriteClass(styles.damage);

                  await wait(750);

                  setOpponentSpriteClass(styles.sprite);
                  setAnnouncerMessage(
                    `${opponent.name} doesn't know what hit her!`,
                  );

                  const damageDealt = magic({
                    attacker: player,
                    receiver: opponent,
                  });
                  const remainingHealth = opponentHealth - damageDealt;
                  // We don't want a negative HP.
                  setOpponentHealth(
                    remainingHealth > 0 ? remainingHealth : 0,
                  );

                  await wait(2500);

                  setAnnouncerMessage(`Now it's ${opponent.name}'s turn!`);
                  setTurn(1);
                }}
                onAttack={async () => {
                  setTurn(-1);
                  /*
                    1. Update message
                    2. Animate attacker
                    3. Animate receiver
                    4. Update health
                    5. Update message
                    6. Update player turn
                  */

                  setAnnouncerMessage(
                    `${player.name} has chosen to attack!`,
                  );

                  await wait(1000);

                  setPlayerSpriteClass(styles.playerAttacking);

                  await wait(100);

                  setPlayerSpriteClass(styles.sprite);

                  await wait(500);

                  setOpponentSpriteClass(styles.damage);

                  await wait(750);

                  setOpponentSpriteClass(styles.sprite);
                  setAnnouncerMessage(`${opponent.name} felt that!`);

                  const damageDealt = attack({
                    attacker: player,
                    receiver: opponent,
                  });
                  const remainingHealth = opponentHealth - damageDealt;
                  // We don't want a negative HP.
                  setOpponentHealth(
                    remainingHealth > 0 ? remainingHealth : 0,
                  );

                  await wait(2000);

                  setAnnouncerMessage(`Now it's ${opponent.name}'s turn!`);
                  setTurn(1);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
