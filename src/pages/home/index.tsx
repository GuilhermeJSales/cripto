import { Link } from 'react-router';
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';

export function Home() {
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
