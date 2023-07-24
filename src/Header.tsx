import styles from "../styles/Main.module.scss";

export function Header() {
    return (
        <header className={styles.header}>
            <h2 className={styles.header} translate={"no"}>
                F<span className={styles.red}>&middot;</span>
                r<span className={styles.blue}>&middot;</span>
                i<span className={styles.yellow}>&middot;</span>
                e<span className={styles.red}>&middot;</span>
                n<span className={styles.yellow}>&middot;</span>
                d<span className={styles.blue}>&middot;</span>
                s
                {/*<span style={{*/}
                {/*    width: "2rem",*/}
                {/*    height: "1px",*/}
                {/*    display: "inline-block",*/}
                {/*}}/>*/}
                <span>-</span>
                search</h2>

            <h4>
                Search anything from the iconic series Friends
            </h4>

            <h5>
                You can search for sentences in English, French and Hebrew
            </h5>
        </header>
    )
}
