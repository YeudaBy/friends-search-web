import type {NextPage} from 'next'
import {FormEvent, useCallback, useEffect, useState} from "react";
import {Api, Sentence as TSentence} from "../src/Api";
import {Sentence} from "../src/Sentence";
import styles from '../styles/Main.module.scss'
import {FaSearch} from "react-icons/fa";
import {useRouter} from "next/router";
import Head from "next/head";

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
        <Head>
            <title>Friends Search - search anything from the iconic series Friends</title>
            <meta name="description" content="Search anything from the iconic series Friends"/>
            <meta name="keywords"
                  content="friends, search, quotes, sentences, episodes, seasons, friends search, friends quotes, friends sentences, friends episodes, friends seasons"/>
            <meta name="author" content="Yeuda By"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="theme-color" content="#EF4D36"/>
            <meta name="msapplication-navbutton-color" content="#EF4D36"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="#EF4D36"/>
            <meta name="msapplication-TileColor" content="#EF4D36"/>
            <meta name="application-name" content="Friends Search"/>
            <meta name="apple-mobile-web-app-title" content="Friends Search"/>
            <meta name="msapplication-tooltip" content="Friends Search"/>
            <meta name="msapplication-starturl" content="https://friends-search.yeudaby.com/"/>
            <meta name="og:title" content="Friends Search"/>
            <meta name="og:description" content="Search anything from the iconic series Friends"/>
            <meta name="og:image" content="https://raw.githubusercontent.com/YeudaBy/Friends-Search/main/web/public/friends-logo_512.png"/>
            <meta name="og:url" content="https://friends-search.yeudaby.com/"/>
            <meta name="og:site_name" content="Friends Search"/>
            <meta name="og:locale" content="en_US"/>
            <meta name="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Friends Search"/>
            <meta name="twitter:description" content="Search anything from the iconic series Friends"/>
            <meta name="twitter:image" content="https://friends-search.yeudaby.com/og-image.png"/>
            <meta name="twitter:image:alt" content="Friends Search"/>
            <meta name="twitter:domain" content="friends-search.yeudaby.com"/>
            <meta name="twitter:url" content="https://friends-search.yeudaby.com/"/>
            <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/YeudaBy/Friends-Search/main/web/public/friends-logo_512.png"/>
            <link rel="mask-icon" href="https://raw.githubusercontent.com/YeudaBy/Friends-Search/main/web/public/friends-logo_512.png" color="#EF4D36"/>
            <link rel="shortcut icon" href="https://raw.githubusercontent.com/YeudaBy/Friends-Search/main/web/public/friends-logo_512.png"/>
            <link rel="canonical" href="https://friends-search.yeudaby.com/"/>

            <link rel="icon" href="https://github.com/YeudaBy/Friends-Search/raw/main/web/public/friends_logo_16.ico" type="image/gif" sizes="16x16" />
            <link rel="icon" href="https://raw.githubusercontent.com/YeudaBy/Friends-Search/main/web/public/friends_logo32.ico" type="image/gif" sizes="32x32" />
            <link rel="icon" href="https://raw.githubusercontent.com/YeudaBy/Friends-Search/main/web/public/friends_logo_48.ico" type="image/gif" sizes="48x48" />

        </Head>
        <h2 className={styles.header} translate={"no"}>
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
