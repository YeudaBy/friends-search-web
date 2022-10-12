import type {NextPage} from 'next'
import {FormEvent, useCallback, useEffect, useState} from "react";
import {Api, Sentence as TSentence} from "../src/Api";
import {Sentence, SentenceSkeleton} from "../src/Sentence";
import styles from '../styles/Main.module.scss'
import {useRouter} from "next/router";
// @ts-ignore
import ScrollOut from "scroll-out";
import {HeadComp} from "../src/HeadComp";
import {Header} from "../src/Header";
import {Search} from "../src/Search";
import Script from "next/script";
import {Credit} from "../src/Credit";


const Home: NextPage = () => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<TSentence[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        ScrollOut({})
    })

    const search = useCallback((event: FormEvent<HTMLFormElement> | string) => {
        setLoading(true);
        if (typeof event !== "string") {
            event.preventDefault();
        }
        setResults(undefined);
        Api.search(query).then(setResults).catch(e => {
            console.error(e);
            setError(true);
        }).finally(() => setLoading(false));
    }, [query]);


    useEffect(() => {
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
        <Script src="https://cdn.jsdelivr.net/npm/scroll-out/dist/scroll-out.min.js"/>
        <Script strategy="lazyOnload" id={"scroll-out"}>
            {`ScrollOut({})`}
        </Script>
        <HeadComp/>
        <Header/>
        <Search value={query} onChange={e =>
            setQuery(e.target.value)} onSubmit={search}/>

        {error && !results && <div className={styles.error}>Some error was found</div>}

        {loading && !results && [...Array(10)].map((_, i) => <SentenceSkeleton key={i}/>)}

        {!!results ? Array.isArray(results) && results.length > 0 ?
            <ul className={styles.results}>
                {results.map(sentence => <li key={sentence.id} data-scroll={""}>
                    <Sentence sentence={sentence}/>
                </li>)}
            </ul> : <p className={styles.noResults}>
                {"I've got nothing for you, sorry :("}
                <br/>
                {"C'mon, let's find something!"}
            </p> : null}

        <Credit/>
    </div>)
}

export default Home
