export const FOOTER_LINKS = [
  {
    titleKey: 'footer.sections.shop',
    links: [
      { nameKey: 'footer.links.delivery_payment', url: '/', rel: null },
      { nameKey: 'footer.links.exchange_return', url: '/', rel: null },
      { nameKey: 'footer.links.sale_rules', url: '/', rel: 'nofollow' },
      { nameKey: 'footer.links.privacy_policy', url: '/', rel: null },
    ],
  },
  {
    titleKey: 'footer.sections.company',
    links: [
      { nameKey: 'footer.links.about_company', url: '/', rel: 'nofollow' },
      { nameKey: 'footer.links.investors', url: '/', rel: 'nofollow' },
      { nameKey: 'footer.links.vacancies', url: '/', rel: 'nofollow' },
      { nameKey: 'footer.links.contacts', url: '/', rel: 'nofollow' },
    ],
  },
  {
    titleKey: 'footer.sections.customers',
    links: [
      { nameKey: 'footer.links.bonus_cards', url: '/', rel: 'nofollow' },
      { nameKey: 'footer.links.gift_cards', url: '/', rel: 'nofollow' },
      { nameKey: 'footer.links.gift_card_balance', url: '/', rel: 'nofollow' },
      {
        nameKey: 'footer.links.electronic_gift_cards',
        url: '/',
        rel: 'nofollow',
      },
    ],
  },
];

// rel="nofollow"     //*это атрибут ссылки <a>, который говорит поисковым системам (Google, Яндекс и др.):«Не переходите по этой ссылке и не передавайте ей SEO-вес.»
