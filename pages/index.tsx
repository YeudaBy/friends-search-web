import type {NextPage} from 'next'
import {FormEvent, useCallback, useEffect, useState} from "react";
import {Api, Sentence as TSentence} from "../src/Api";
import {Sentence} from "../src/Sentence";
import styles from '../styles/Main.module.scss'
import {FaSearch} from "react-icons/fa";
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<TSentence[]>();
    const [error, setError] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);
    const router = useRouter();

    const search = useCallback((event: FormEvent<HTMLFormElement> | string) => {
        if (typeof event !== "string") {
            event.preventDefault();
        }
        setResults(undefined);

        // if (router.query.q !== query && query !== "" && !!query) {
        //     router.push({
        //         pathname: "/",
        //         query: {q: query}
        //     }, undefined, {shallow: true});
        // }
        Api.search(query).then(setResults).catch(e => {
            console.error(e);
            setError(true);
        });
    }, [query]);


    useEffect(() => {
        // if (router.query.q) {
        //     setQuery(router.query.q as string);
        //     search(router.query.q as string);
        // } else
        if (router.query.s) {
            Api.get(parseInt(router.query.s as string)).then(
                sentence => {
                    setResults([sentence]);
                }
            ).catch(e => {
                console.error(e);
                setError(true);
            });
        }
    }, [router.query.q, router.query.s]);

    return (<div className={styles.home}>
        <h2 className={styles.header}>
            F<span className={styles.red}>&middot;</span>
            r<span className={styles.blue}>&middot;</span>
            i<span className={styles.yellow}>&middot;</span>
            e<span className={styles.red}>&middot;</span>
            n<span className={styles.yellow}>&middot;</span>
            d<span className={styles.blue}>&middot;</span>
            s
            search</h2>

        <form onSubmit={search} className={styles.searchForm}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <button type="submit"><FaSearch color={focused ? "#EF4D36" : "#05AFF0"}/></button>
        </form>


        {error && !results && <div className={styles.error}>Some error was found</div>}

        {!!results ? Array.isArray(results) && results.length > 0 ?
            <ul className={styles.results}>
                {results.map(sentence => <li key={sentence.id}>
                    <Sentence sentence={sentence}/>
                </li>)}
            </ul> : <p className={styles.noResults}>
                {"I've got nothing for you, sorry :("}
                <br/>
                {"C'mon, let's find something!"}
            </p> : null}
    </div>)
}

export default Home
