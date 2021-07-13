import { useEffect, useState } from 'react';

export const useSpriteAnimation = ({
  styles,
  playerAnimation,
  opponentAnimation,
}) => {
  const [playerSpriteClass, setPlayerSpriteClass] = useState(
    styles.sprite,
  );
  const [opponentSpriteClass, setOpponentSpriteClass] = useState(
    styles.sprite,
  );

  useEffect(() => {
    const styleMap = {
      damage: styles.damage,
      static: styles.sprite,
      magic: styles.doingMagic,
      attack: styles.opponentAttacking,
    };
    setOpponentSpriteClass(styleMap[opponentAnimation]);
  }, [styles, opponentAnimation]);

  useEffect(() => {
    const styleMap = {
      damage: styles.damage,
      static: styles.sprite,
      magic: styles.doingMagic,
      attack: styles.playerAttacking,
    };

    setPlayerSpriteClass(styleMap[playerAnimation]);
  }, [styles, playerAnimation]);

  return {
    playerSpriteClass,
    opponentSpriteClass,
  };
};
