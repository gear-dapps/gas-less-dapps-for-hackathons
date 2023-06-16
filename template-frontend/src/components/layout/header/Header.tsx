import { ReactComponent as LogoutSVG } from "assets/images/icons/logout.svg";
import { Button } from "@gear-js/ui";
import { useAccount } from "contexts/Account";
import { useAdmin } from "contexts/admin";
import { Logo } from "./logo";
import styles from "./Header.module.scss";
import { AccountButton } from "./account-button";

function Header() {
  const { logout, isLoggedIn, account } = useAccount();
  const { admin, logout: logoutAdmin } = useAdmin();

  const isUser = admin.isAdmin || isLoggedIn;

  const onLogout = () => {
    logout();
    logoutAdmin();
  };

  return (
    <header className={styles.header}>
      <Logo />

      {isUser && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {!admin.isAdmin && (
            <AccountButton address={account.publicKey as string} />
          )}

          <Button
            icon={LogoutSVG}
            color="transparent"
            style={{ marginLeft: "16px" }}
            text="Logout"
            onClick={onLogout}
          />
        </div>
      )}
    </header>
  );
}

export { Header };
