import { buttonStyles } from "@gear-js/ui";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./Auth.module.scss";

function Auth() {
  return (
    <div>
      <div className={styles.containerHero}>
        <h1>Web3 Gamers registration service</h1>
        <div className={styles.containerHeroText}>
          <p>
            The service allows you to play Web3 blockchain-based games without
            having to register a Web3 wallet, pay with tokens for gas, and sign
            transactions. <br /> You can register using your email or a nickname
            to start playing the game.
          </p>
        </div>
      </div>

      <div className={styles.containerForm}>
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
    </div>
  );
}

export { Auth };
