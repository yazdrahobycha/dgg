import styles from "./page.module.css";
import MainInput from "@/components/MainInput";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MainInput/>
      </main>
    </div>
  );
}
