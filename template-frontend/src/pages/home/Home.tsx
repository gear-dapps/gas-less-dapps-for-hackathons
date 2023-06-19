import { useAccount } from "../../contexts/Account";
import styles from "./home.module.scss";
import { AvailableGames } from "../../components/common/available-games";

function Home() {
  const { account } = useAccount();

  return (
    <div className={styles.container}>
      <div className={styles.containerHero}>
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
      </div>

      <div className={styles.games}>
        <AvailableGames />
      </div>
    </div>
  );
}

export { Home };
