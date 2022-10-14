import {useEffect, useState} from "react";
import {Api, Sentence as TSentence} from "./Api";
import {Sentence, SentenceSkeleton} from "./Sentence";
import styles from "../styles/Main.module.scss";

export function MostLiked() {
    const [results, setResults] = useState<TSentence[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        setVisible(false);
        const timeout = setTimeout(() => {
            setLoading(true);
            setVisible(true);
            Api.getMostLiked().then(setResults).catch(e => {
                console.error(e);
                setError(true);
            }).finally(() => setLoading(false));
        }, 6000);
        return () => clearTimeout(timeout);
    }, [])

    return (visible ? <div className={styles.mostLiked}>
        <h4>
            Here is what people like the most:
        </h4>
        {loading && !results && [...Array(10)].map((_, i) => <SentenceSkeleton key={i}/>)}
        {error && !results && <div className={styles.error}>Some error was found</div>}
        {!!results ? Array.isArray(results) && results.length > 0 ?
            <ul className={styles.results}>
                {results.map(sentence => <li key={sentence.id} data-scroll={""}>
                    <Sentence sentence={sentence}/>
                </li>)}
            </ul> : null : null}
    </div> : null)
}