import Link from "next/link";
import styles from "../styles/Main.module.scss"

export default function Custom404() {
    return <div className={styles.pageNotFound}>
        <h1>
            {"I think you're lost :( "}
        </h1>

        <h3>
            {"The page that you're looking for doesn't exist"}
        </h3>

        <h3>
            {"You can go back to the "}
            <Link href="/">
                <a>
                    {"home page"}
                </a>
            </Link>
        </h3>

    </div>
}