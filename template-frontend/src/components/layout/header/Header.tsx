import { ReactComponent as LogoutSVG } from "assets/images/icons/logout.svg";
import { Button } from "@gear-js/ui";
import { useAccount } from "contexts/Account";
import { Logo } from "./logo";
import styles from "./Header.module.scss";
import { AccountButton } from "./account-button";

function Header() {
  const { logout, isLoggedIn, account } = useAccount();

  const onLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <Logo />

      {isLoggedIn && (
        <div className={styles.actions}>
          <span>Welcome,</span>
          <AccountButton address={account.publicKey as string} />
          <Button
            icon={LogoutSVG}
            color="transparent"
            text="Logout"
            onClick={onLogout}
          />
        </div>
      )}
    </header>
  );
}

export { Header };
