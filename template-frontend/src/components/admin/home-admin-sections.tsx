import { Button, buttonStyles } from "@gear-js/ui";
import { useState } from "react";
import clsx from "clsx";
import styles from "./admin.module.scss";
import { AdminGetTokens } from "./admin-get-tokens";
import { IUsersTokens } from "../../types/admin";
import { DappRegisterForm } from "./dapp-register-form";

export function HomeAdminSections() {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [usersTokens, setUsersTokens] = useState<IUsersTokens>({});

  const tokens = Object.entries(usersTokens);

  return (
    <div className={styles.hero}>
      <div className={styles.heroDescription}>
        <p> Registration in Gear Foundation&apos;s Game service Status:</p>
        <p>
          {isApproved === null ? (
            <button
              className={clsx(
                buttonStyles.button,
                buttonStyles.link,
                styles.asLink
              )}
              type="button"
              onClick={() => setIsApproved((prev) => !prev)}
            >
              Check status
            </button>
          ) : (
            <b>{isApproved ? "Active" : "registration required"}</b>
          )}
        </p>
      </div>

      {isApproved && (
        <div className={styles.content}>
          <div className="">
            <DappRegisterForm />

            <Button text="Register my dApp" />
          </div>

          <div className={styles.adminUsersTokens}>
            <AdminGetTokens updateData={setUsersTokens} />

            {tokens.length > 0 && (
              <div className={styles.adminUsersTokensContent}>
                <h2>Users Tokens</h2>

                <div className={styles.containerHeroTextDetails}>
                  <table>
                    <tbody>
                      {tokens.map(([user, value]) => (
                        <tr>
                          <th scope="row">{user}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
