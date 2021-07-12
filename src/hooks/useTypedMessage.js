import { wait } from 'shared';
import { useEffect, useState } from 'react';

export const useTypedMessage = message => {
  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    setTypedMessage('');

    if (message.length) {
      (async () => {
        for (let i = 0; i < message.length; i++) {
          await wait(25);
          setTypedMessage(typed => typed + message[i]);
        }
      })();
    }
  }, [message]);

  return typedMessage;
};
