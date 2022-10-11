import {Api, Sentence as TSentence} from "./Api";
import React, {useEffect, useState} from "react";
import styles from "../styles/Main.module.scss"
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {Sentence} from "./Sentence";

const DELAY = 500;

export function SentenceContainer({sentence}: { sentence: TSentence }) {
    const [current, setCurrent] = useState(0);
    const [list, setList] = useState<TSentence[]>([]);
    const ref = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setList([sentence]);
        setCurrent(0);
    }, [sentence]);

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    }, [current, ref])

    const next = () => {
        Api.get(list[current].id + 1).then((sentence) => {
            setList([...list, sentence]);
            setCurrent(current + 1);
            ref.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
        });
    }

    const previous = () => {
        console.log(current);
        console.log(list);
        Api.get(list[Math.min(current, 0)]?.id - 1).then((sentence) => {
            setList([sentence, ...list]);
            setCurrent(0);
        })
    }

    return (
        <div className={styles.sentenceContainer}>
            <button className={styles.previousButton} onClick={previous}>
                <FaAngleLeft/>
            </button>

            <div className={styles.sentencesList} ref={listRef}>
                {list.map((sentence, index, arr) => {
                    return <div key={sentence.id} ref={index === (arr.length - 1) ? ref : null}>
                        <Sentence sentence={sentence}/>
                    </div>
                })}
            </div>

            <button className={styles.nextButton} onClick={next}>
                <FaAngleRight/>
            </button>
        </div>
    );
}