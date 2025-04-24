import { Link, useNavigate } from 'react-router';
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { FormEvent, useEffect, useState } from 'react';

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
  numberDelta: number;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

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
              numberDelta: parseFloat(item.delta_24h.replace(',', '.')),
            };

            return formated;
          });
          setCoins(formatResult);
        });
    }

    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inputValue === '') return;
    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o símbolo da moeda: BTC..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
          {coins.map((coin) => (
            <tr className={styles.tr} key={coin.name}>
              <td data-label="Moeda" className={styles.tdLabel}>
                <Link to={`/detail/${coin.symbol}`} className={styles.link}>
                  <span>{coin.name} </span> | {coin.symbol}
                </Link>
              </td>
              <td data-label="Mercado" className={styles.tdLabel}>
                {coin.formatedMarket}
              </td>
              <td data-label="Preço" className={styles.tdLabel}>
                {coin.formatedPrice}
              </td>
              <td
                data-label="Volume"
                className={
                  coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss
                }
              >
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
