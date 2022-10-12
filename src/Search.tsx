import styles from "../styles/Main.module.scss";
import {FaSearch} from "react-icons/fa";
import {ChangeEvent, FormEvent, useState} from "react";

type Props = {
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement> | string) => void;
}

export function Search({value, onChange, onSubmit}: Props) {
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <form onSubmit={onSubmit} className={styles.searchForm}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <button type="submit"><FaSearch color={focused ? "#EF4D36" : "#05AFF0"}/></button>
        </form>
    )

}