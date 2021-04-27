import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [usd, setUSD] = useState(0);
  const [thb, setTHB] = useState(0);
  const [jpy, setJPY] = useState(0);
  const [cny, setCNY] = useState(0);
  axios
    .get(
      "http://data.fixer.io/api/latest?access_key=99bc8fc0517692665d3e71dcc8c12535&symbols=THB,CNY,JPY,USD&format=1"
    )
    .then((res) => {
      // console.log(res);
      setUSD(res.data.rates.USD);
      setTHB(res.data.rates.THB);
      setJPY(res.data.rates.JPY);
      setCNY(res.data.rates.CNY);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <Layout>
      <div className={styles.homepage}>
        <p className={styles.indexTitle}>เสื้อผ้าแฟนชั่น</p>
        <p className={styles.subtitle}>คอลเลคชั่นใหม่</p>
        <button className={styles.indexButton} onClick={() => {
            router.push("/shop");
          }}>เลือกชมสินค้า</button>
      </div>
      <div className="rows" style={{ marginTop: "-10px" }}>
        <p className={styles.curencytitle}>อัตราแลกเปลี่ยนเงินตรา 1 EUR :</p>
        <div className={styles.exchage}>
          <img className={styles.flag} src={"image/thai.jpg"}></img>
          <p className={styles.curencytitle}>THB:{thb.toFixed(2)}</p>
        </div>
        <div className={styles.exchage}>
          <img className={styles.flag} src={"image/japan.png"}></img>
          <p className={styles.curencytitle}>JPY:{jpy.toFixed(2)}</p>
        </div>
        <div className={styles.exchage}>
          <img className={styles.flag} src={"image/china.png"}></img>
          <p className={styles.curencytitle}>CNY:{cny.toFixed(2)}</p>
        </div>
        <div className={styles.exchage}>
          <img className={styles.flag} src={"image/usd.png"}></img>
          <p className={styles.curencytitle}>USD:{usd.toFixed(2)}</p>
        </div>
      </div>
    </Layout>
  );
}
