import styles from "./Copyright.module.scss";

function Copyright() {
  const year = new Date().getFullYear();

  return (
    <small className={styles.copyright}>
      &copy; {year} Gear Technologies, Inc. All Rights Reserved.
    </small>
  );
}

export { Copyright };
