import { useTranslation } from 'react-i18next';
import { CURRENT_YEAR } from '@/constants/footerData';
import { FOOTER_LINKS } from '@/constants/footerLinks';
import { TFooterProps } from './type';
import { ReactComponent as InstagramIcon } from '@icon/instagram.svg';
import { ReactComponent as Vk } from '@icon/vk.svg';
import { ReactComponent as FacebookIcon } from '@icon/facebook.svg';
import styles from './Footer.module.scss';
import { addSubscriberApi } from '@/api/subscribersApi';
import { EmailSubscription } from '../EmailSubscription';

const socialIconMap = {
  Instagram: InstagramIcon,
  Vk: Vk,
  Facebook: FacebookIcon,
};

export const Footer = ({ socialLinks, onSubscribe }: TFooterProps) => {
  const { t } = useTranslation(); //хук перевода

  return (
    <footer className={styles.footer}>
      <ul className={styles.footerNavigation}>
        {FOOTER_LINKS.map((block) => (
          <li className={styles.blockOnlineStore} key={block.titleKey}>
            <span className={styles.sectionContent} data-testid="typography">
              {t(block.titleKey)}
            </span>
            <ul className={styles.blockCategory}>
              {block.links.map((link) => (
                <li key={link.nameKey}>
                  <a
                    className={styles.link}
                    href={link.url}
                    rel={link.rel || undefined}
                  >
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className={styles.containerEmail}>
        <EmailSubscription onSubscribe={addSubscriberApi} />
      </div>
      <section className={styles.socialAndSubscribe}>
        <p className={styles.copyrightNotice}>
          © {CURRENT_YEAR} UnnToyStore. {t('footer.rights')}
        </p>
        <ul className={styles.socialLinks}>
          {socialLinks.map((link) => {
            const Icon = socialIconMap[link.name as keyof typeof socialIconMap];
            return (
              <li key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {Icon && <Icon className={styles.icon} />}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </footer>
  );
};
