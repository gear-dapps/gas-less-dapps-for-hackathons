import { useAccount } from 'contexts/Account';
import { buttonStyles } from '@gear-js/ui';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Info.module.scss';

function Info() {
  const { account } = useAccount();

  return (
    <div className={styles.keys}>
      <p>Public Key: {account.publicKey}</p>
      <p>Private Key: {account.privateKey}</p>

      <Link
        to="/"
        className={clsx(
          buttonStyles.button,
          buttonStyles.primary,
          buttonStyles.medium,
          styles.continueButton
        )}
      >
        Continue
      </Link>
    </div>
  );
}

export { Info };
