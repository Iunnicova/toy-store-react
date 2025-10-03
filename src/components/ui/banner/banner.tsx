import styles from './banner.module.scss';
import toyBanner5 from '/images/banner5.png';

export const Banner = () => (
    <section>

    <img src={toyBanner5}
      className={styles.banner}
      height="600"
      width="600"
      alt="Друзья на пикнике"
    />
  </section>
)