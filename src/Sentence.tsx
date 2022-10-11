import {Api, Sentence} from "./Api";
import styles from "../styles/Main.module.scss"
import {useEffect, useState} from "react";
import {FaAngleLeft, FaAngleRight, FaHeart, FaShare} from "react-icons/fa";
import ShareButton from "./Share";


export function Sentence({sentence: sentenceProps}: { sentence: Sentence }) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [sentence, setSentence] = useState<Sentence>();
    const [isSsr, setIsSsr] = useState<boolean>(true);
    useEffect(() => setIsSsr(false), []);

    useEffect(() => {
        setSentence(sentenceProps);
    }, [sentenceProps]);

    useEffect(() => {
        setIsLiked(false)
    }, [sentence]);

    function like() {
        setIsLiked(!isLiked);
        sentence && Api.like(sentence.id);
    }

    function next() {
        sentence && Api.get(sentence.id + 1).then(setSentence);
    }

    function prev() {
        sentence && Api.get(sentence.id - 1).then(setSentence);
    }


    return (
        sentence ? <div className={styles.sentence}>
            <p>{sentence.content}</p>

            <div className={styles.sentenceDetails}>
                <p className={styles.episode}>Season {sentence.position.season} Episode {sentence.position.episode}</p>
                <p className={styles.position}>
                    {convertToRealTime(sentence.position.start)}
                    -
                    {convertToRealTime(sentence.position.end)}</p>
                <p className={styles.likes}>{sentence.details.likes} likes</p>
            </div>

            <div className={styles.sentenceActions}>
                <button
                    className={styles.previousButton}
                    onClick={prev}
                    aria-label={"Previous button"}>
                    <FaAngleLeft/>
                </button>


                <button
                    className={styles.likeButton}
                    onClick={like}
                    disabled={isLiked}
                    aria-disabled={isLiked}
                    aria-label={"Like button"}>
                    <FaHeart/>
                </button>

                {!isSsr && <ShareButton sentence={sentence}/>}

                <button
                    className={styles.nextButton}
                    onClick={next}
                    aria-label={"Next button"}>
                    <FaAngleRight/>
                </button>
            </div>
        </div> : <SentenceSkeleton/>
    );
}

function convertToRealTime(time: string) {
    return time.split(":")[1] + ":" + time.split(":")[2].split(".")[0];
}


function SentenceSkeleton() {
    return <div className={styles.sentenceSkeleton}>
        <p className={styles.sentenceContentSkeleton}></p>

        <div className={styles.sentenceDetailsSkeleton}>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div className={styles.sentenceActions}>
            <FaAngleLeft/>
            <FaHeart/>
            <FaShare/>
            <FaAngleRight/>
        </div>
    </div>
}