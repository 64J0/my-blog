import styles from "./rodape.module.scss";

function Rodape() {
  return (
    <div className={`${styles.footerFlex}`}>
      <div>
        <h3>REDES SOCIAIS</h3>
        <a href="https://www.instagram.com/grupofullengenharia/">
          <img src="/images/instagramicone.png" />
        </a>
        <a href="https://www.facebook.com/grupofull/">
          <img src="/images/facebookicone.png" />
        </a>
        <a href="https://twitter.com/fullengenharia">
          <img src="/images/twittericone.png" />
        </a>
      </div>
      <div>
        <h3>FULL ENGENHARIA</h3>
        <p>Endereço: Av. Tedinho Alvim, 90 - Sala 409 - Liberdade</p>
        <p>Divinópolis - MG</p>
        <p className={`${styles.pv10px}`}>Telefone: (37) 3212-7715</p>
        <p>fullengenharia@fullengenharia.com.br</p>
      </div>
      <div>
        <h3>HORÁRIO DE FUNCIONAMENTO</h3>
        <p>Segunda-feira a Sexta-feira • 08:00 às 17:00</p>
      </div>
    </div>
  );
}

export default Rodape;
