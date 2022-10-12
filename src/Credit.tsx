import styles from "../styles/Main.module.scss"
import {FaCode, FaGithub, FaTelegramPlane} from "react-icons/fa";

export function Credit() {
    return (
        <footer className={styles.footer}>
            <p>
                Created by <a href="https://yeudaby.com" target="_blank" rel="noreferrer">Yeuda By</a>
            </p>

            <p>
                <a href="" target="_blank" rel="noreferrer">
                    <FaGithub/>
                    Source code
                </a>
            </p>

            <p>
                <a href="" target="_blank" rel="noreferrer">
                    <FaCode/>
                    API
                </a>
            </p>

            <p>
                <a href={""} target="_blank" rel="noreferrer">
                    <FaTelegramPlane/>
                    Telegram Bot
                </a>
            </p>
        </footer>
    )
}