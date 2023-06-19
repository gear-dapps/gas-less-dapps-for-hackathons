import styles from "./styles.module.scss";

export function AvailableGames() {
  return (
    <section className="">
      <h2>Available games</h2>
      <ul className={styles.gamesList}>
        <li>
          <a
            href="https://"
            target="_blank"
            rel="noreferrer"
            title="Game title"
          >
            <div />
          </a>
        </li>
        <li>
          <a
            href="https://"
            target="_blank"
            rel="noreferrer"
            title="Game title"
          >
            <div />
          </a>
        </li>
        <li>
          <a
            href="https://"
            target="_blank"
            rel="noreferrer"
            title="Game title"
          >
            <div />
          </a>
        </li>
      </ul>
    </section>
  );
}
