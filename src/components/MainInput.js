"use client"
import { useState, useEffect } from "react";
import styles from "../app/page.module.css";

export default function MainInput() {
    const [count, setCount] = useState(6);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showClipboardMessage, setShowClipboardMessage] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks?count=${count}`);
            const data = await res.json();
            if (data.success) {
                setItems(data.data);
            } else {
                setLoading(false);
                console.error("Error fetching items");
            }
        } catch (error) {
            console.error("Request failed", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (items.length > 0) {
            const itemNames = items.map(item => item.name).join("\n\n");
            navigator.clipboard.writeText(itemNames)
                .then(() => {
                    setShowClipboardMessage(true);
                    setTimeout(() => setShowClipboardMessage(false), 2000);
                })
                .catch(err => console.error("Clipboard write failed", err));
        }
    }, [items]);

    return (
        <>
        <div className={styles.ctas}>
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min={1}
                className={styles.primary}
            />
            {loading ? <p className={styles.secondary}>Loading...</p>
                : <button className={styles.secondary} onClick={fetchItems}>Get Tasks</button>}
        </div>
        {showClipboardMessage && <p>Copied to clipboard!</p>}
            {...items.map((item, i) => (<p key={i}>{item.name}</p>))}
        </>
    );
}
