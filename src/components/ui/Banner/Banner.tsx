import toyBanner5 from '/images/banner5.png';
import styles from './Banner.module.scss';

export const Banner = () => (
  <section className={styles.banner}>
    <img
      src={toyBanner5}
      className={styles.imgBanner}
      alt="Друзья на пикнике"
    />
  </section>
);
