import { Button } from "@gear-js/ui";
import { useAlert } from "@gear-js/react-hooks";
import { useState } from "react";
import { useAccount } from "../../contexts/Account";
import styles from "./home.module.scss";
import { AvailableGames } from "../../components/common/available-games";
import { ADDRESS } from "../../consts";
import {IUsersTokens} from '../../types/admin'
import {AdminGetTokens} from '../../components/admin/admin-get-tokens'


function Home() {
  const { account } = useAccount();
  const [usersTokens, setUsersTokens] = useState<IUsersTokens>({});

  const isAdmin = Boolean(account.isAdmin);

  return (
    <div className={styles.container}>
      <div className={styles.containerHero}>
        <h1>Welcome, {isAdmin ? "admin" : "gamer"}!</h1>
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

      {isAdmin && (
        <div className={styles.adminUsersTokens}>
          <AdminGetTokens updateData={setUsersTokens} />

          <div className={styles.adminUsersTokensContent}>
            <h2>Users Tokens</h2>
            <div className={styles.containerHeroTextDetails}>
              <table>
                <tbody>
                  {Object.entries(usersTokens)?.map(([user, value]) => (
                    <tr>
                      <th scope="row">{user}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <AvailableGames />
    </div>
  );
}

export { Home };
