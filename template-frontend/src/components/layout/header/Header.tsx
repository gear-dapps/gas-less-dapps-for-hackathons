import { ReactComponent as LogoutSVG } from 'assets/images/icons/logout.svg';
import { Button } from '@gear-js/ui';
import { useAccount } from 'contexts/Account';
import { Logo } from './logo';
import styles from './Header.module.scss';
import { AccountButton } from './account-button';

function Header() {
  const { logout, isLoggedIn, account } = useAccount();

  return (
    <header className={styles.header}>
      <Logo />

      {isLoggedIn && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AccountButton address={account.publicKey as string} />
          <Button
            icon={LogoutSVG}
            color="transparent"
            style={{ marginLeft: '16px' }}
            onClick={logout}
          />
        </div>
      )}
    </header>
  );
}

export { Header };
