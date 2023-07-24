import styles from "../styles/Main.module.scss";
import {FaShare} from "react-icons/fa";
import {Sentence as TSentence} from "./Api";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";

function ShareButton({sentence}: { sentence?: TSentence }) {
    const [url, setUrl] = useState<string>("");


    useEffect(() => {
        if (sentence) {
            setUrl(window.location.host + "/?s=" + sentence.id);
        }
    }, [sentence]);


    function share() {
        navigator.clipboard.writeText(url)
    }

    return (
        <button
            className={styles.shareButton}
            onClick={share}
            aria-label={"Share button"}>
            <FaShare stroke={"black"}/>
        </button>
    )
}


export default dynamic(() => Promise.resolve(ShareButton), {
    ssr: false
})
