import { useAccount } from "../../contexts/Account";
import styles from "./home.module.scss";
import { AvailableGames } from "../../components/common/available-games";
import { useAdmin } from "../../contexts/admin";
import { HomeAdminSections } from "../../components/admin/home-admin-sections";

function Home() {
  const { account } = useAccount();
  const { admin } = useAdmin();

  const isAdmin = Boolean(admin.isAdmin);

  return (
    <div className={styles.container}>
      <div className={styles.containerHero}>
        <h1>Welcome, {isAdmin ? "admin" : "gamer"}!</h1>

        {!isAdmin && (
          <div className={styles.containerHeroText}>
            <p>Your account details:</p>
            <div className={styles.containerHeroTextDetails}>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">Public key:</th>
                    <td>{account.publicKey}</td>
                  </tr>
                  <tr>
                    <th scope="row">Private key:</th>
                    <td>{account.privateKey}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isAdmin && <HomeAdminSections />}
      </div>

      <AvailableGames />
    </div>
  );
}

export { Home };
