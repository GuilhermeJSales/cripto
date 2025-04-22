import { Link } from 'react-router';
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';

// https://coinlib.io/api/v1/coinlist?key=3ce7d1db5d873de6

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    function getData() {
      fetch('https://sujeitoprogramador.com/api-cripto/?key=3ce7d1db5d873de6')
        .then((response) => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 15);

          let price = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };

            return formated;
          });
          setCoins(formatResult);
        });
    }

    getData();
  }, []);

  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Digite o símbolo da moeda: BTC..." />
        <button type="submit">
          <BiSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr className={styles.tr}>
            <td data-label="Moeda" className={styles.tdLabel}>
              <Link to="detail/btc" className={styles.link}>
                <span>Bitcoin </span> | BTC
              </Link>
            </td>
            <td data-label="Mercado" className={styles.tdLabel}>
              R$ 19293
            </td>
            <td data-label="Preço" className={styles.tdLabel}>
              R$ 40.962
            </td>
            <td data-label="Volume" className={styles.tdProfit}>
              <span>-5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
