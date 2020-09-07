import Link from "next/link";
import styles from "./cabecalho.module.scss";

const altMessage = "Logo";

export default function Cabecalho() {
  return (
    <header className={`${styles.flexHeader}`}>
      <img
        className={`${styles.logo}`}
        src="/images/logo.png"
        alt={altMessage}
      />
      <span className={`${styles.menuPages}`}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/projetos">
          <a>Projetos</a>
        </Link>
        <Link href="/mapeamento">
          <a>Mapeamento Digital</a>
        </Link>
        <Link href="/noticias">
          <a>Noticias</a>
        </Link>
        <Link href="/contato">
          <a>Contato</a>
        </Link>
        <Link href="/cliente">
          <a>Área do Cliente</a>
        </Link>
      </span>
    </header>
  );
}
