import { Link } from 'react-router';
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import { Home } from '../../pages/home';

export function Header() {
  return (
    <>
      <header className={styles.container}>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>
    </>
  );
}
