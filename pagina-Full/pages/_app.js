// Este componente App é o componente mais externo que será comum a todas as páginas da aplicação. Neste caso ele está sendo utilizado apenas para carregar uma folha de estilos global que poderá ser acessada em todos os componentes do projeto.
// Importante: Este é o único lugar em que é possível definir estilos globais na aplicação Next.js.

import "../styles/global.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
