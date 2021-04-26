import Layout from "../components/layout";
import { useState, useEffect } from "react";
import styles from "../styles/shop.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";
import CheckRouter from "../components/checkrouter";

const Shop = ({ token }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const productList = [
    { id: "1", productName: "Smith&Wesson", price: "350" },
    { id: "2", productName: "Mafia Skull", price: "400" },
    { id: "3", productName: "Last Game", price: "400" },
    { id: "4", productName: "Harley Davidson", price: "500" },
    { id: "5", productName: "The Rolling Stovel", price: "400" },
    { id: "6", productName: "Hawaii Shirt", price: "300" },
    { id: "7", productName: "Hawaii Shirt", price: "300" },
    { id: "8", productName: "Hawaii Shirt", price: "300" },
    { id: "9", productName: "ONE PIECE Hawaii Shirt", price: "350" },
    { id: "10", productName: "HUF T-Shirt V.1", price: "350" },
    { id: "11", productName: "HUF T-Shirt V.2", price: "350" },
    { id: "12", productName: "HUF T-Shirt V.3", price: "400" },
  ];
  return (
    <Layout>
      <div>
        <div className={styles.cart}>
          <img
            onClick={() => {
              router.push("/cart");
            }}
            className={styles.cartIcon}
            src={"image/cart.png"}
          ></img>
        </div>
        <div className={styles.productBox}>
          <div className={styles.productList}>
            {productList.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    className={styles.productImage}
                    src={`image/cloths/${item.id}.jpg`}
                  ></img>
                  <div className={styles.productDetial}>
                    <p className={styles.productName}>{item.productName}</p>
                    <p className={styles.productName}>{item.price}฿</p>
                    <button className={styles.addCartButton}>
                      เพิ่มลงในตะกร้า
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// export default CheckRouter(Shop);
export default Shop;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
