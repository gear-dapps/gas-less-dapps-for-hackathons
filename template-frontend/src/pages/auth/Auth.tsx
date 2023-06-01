import { buttonStyles } from '@gear-js/ui';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Auth.module.scss';

function Auth() {
  return (
    <div className={styles.container}>
      <Link
        to="/login"
        className={clsx(
          buttonStyles.button,
          buttonStyles.primary,
          buttonStyles.medium,
          buttonStyles.block
        )}
      >
        Login
      </Link>

      <Link
        to="/register"
        className={clsx(
          buttonStyles.button,
          buttonStyles.light,
          buttonStyles.medium,
          buttonStyles.block
        )}
      >
        Register
      </Link>
    </div>
  );
}

export { Auth };
