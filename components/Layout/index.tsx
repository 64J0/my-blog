import React from "react";
import styles from "./styles.module.scss";

import HeaderHome from "../HeaderHome";
import HeaderPost from "../HeaderPost";

export const siteTitle = "64j0 Blog";

interface LayoutProps {
    home?: any;
  }

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          {
            home ? (<HeaderHome />) : (<HeaderPost />)
          }
        </header>

        <main className={styles.mainContainer}>
          {children}
        </main>
      </div>
      <div className={styles.footerDesign}>
        <footer className={styles.footer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,320L18.5,293.3C36.9,267,74,213,111,181.3C147.7,149,185,139,222,117.3C258.5,96,295,64,332,74.7C369.2,85,406,139,443,149.3C480,160,517,128,554,112C590.8,96,628,96,665,128C701.5,160,738,224,775,224C812.3,224,849,160,886,160C923.1,160,960,224,997,218.7C1033.8,213,1071,139,1108,138.7C1144.6,139,1182,213,1218,245.3C1255.4,277,1292,267,1329,256C1366.2,245,1403,235,1422,229.3L1440,224L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path>
          </svg>
        </footer>
      </div>
    </>
  );
}

export default Layout;
