import toyBee from '/images/toy.png';
import toyTiger from '/images/toy2.png';
import toySquirrel from '/images/toy3.png';
import toyHedgehog from '/images/toy4.png';
import toyBunny from '/images/toy5.png';
// import toyGirl from '/images/toy6.png';
import toyFrog from '/images/toy7.png';
import toyFox from '/images/toy8.png';
import toyBoy from '/images/toy9.png';
import toyButterfly from '/images/toy13.png';
import toyDoggie from '/images/toy10.png';
import toyHedgehog1 from '/images/toy11.png';
import toyKitty from '/images/toy12.png';
import { TToy } from '../types/toysData';

export const toys: TToy[] = [
  {
    id: 0,
    translationKey: 'tiger_dream_keeper', // осмысленный ключ сущности
    titleKey: 'toys.tiger_dream_keeper.title', // ключ для заголовка
    price: 4900,
    toyImage: toyTiger,
    characteristic: {
      size: 45,
      materialKey: 'toys.tiger_dream_keeper.material',
      fillerKey: 'toys.tiger_dream_keeper.filler',
      ageKey: 'toys.tiger_dream_keeper.age',
      packagingKey: 'toys.tiger_dream_keeper.packaging',
    },
    descriptionKey: 'toys.tiger_dream_keeper.description',
  },
  {
    id: 1,
    translationKey: 'bunny_hopping',
    titleKey: 'toys.bunny_hopping.title',
    price: 5700,
    toyImage: toyBunny,
    characteristic: {
      size: 55,
      materialKey: 'toys.bunny_hopping.material',
      fillerKey: 'toys.bunny_hopping.filler',
      ageKey: 'toys.bunny_hopping.age',
      packagingKey: 'toys.bunny_hopping.packaging',
    },
    descriptionKey: 'toys.bunny_hopping.description',
  },
  {
    id: 2,
    translationKey: 'cutie_luna_antistress',
    titleKey: 'toys.cutie_luna_antistress.title',
    price: 5900,
    toyImage: toyBee,
    characteristic: {
      size: 55,
      materialKey: 'toys.cutie_luna_antistress.material',
      fillerKey: 'toys.cutie_luna_antistress.filler',
      ageKey: 'toys.cutie_luna_antistress.age',
      packagingKey: 'toys.cutie_luna_antistress.packaging',
    },
    descriptionKey: 'toys.cutie_luna_antistress.description',
  },
  {
    id: 3,
    translationKey: 'bella_the_squirrel',
    titleKey: 'toys.bella_the_squirrel.title',
    price: 6100,
    toyImage: toySquirrel,
    characteristic: {
      size: 65,
      materialKey: 'toys.bella_the_squirrel.material',
      fillerKey: 'toys.bella_the_squirrel.filler',
      ageKey: 'toys.bella_the_squirrel.age',
      packagingKey: 'toys.bella_the_squirrel.packaging',
    },
    descriptionKey: 'toys.bella_the_squirrel.description',
  },

  // {
  //   id: 4,
  //   titleKey: 'Бабочка Фея подарит сладкие сны',
  //   price: 5700,
  //   toyImage: toyButterfly,
  //   characteristic: {
  //     size: 55,
  //     materialKey: 'гипоаллергенный плюш',
  //     fillerKey: 'холлофайбер',
  //     ageKey: 'от 1 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Бабочка Фея — нежная и волшебная подружка для сна. Её мягкие крылышки, сияющая улыбка и сказочный образ помогают малышам расслабиться и погрузиться в мир добрых снов. Она словно прилетела из сказки, чтобы обнять и успокоить.',
  // },
  // {
  //   id: 5,
  //   titleKey: 'Ёжик Петя-любитель грибочков',
  //   price: 5100,
  //   toyImage: toyHedgehog,
  //   characteristic: {
  //     size: 45,
  //     materialKey: 'Велсофт (velsoft)',
  //     fillerKey: 'микрогранулы',
  //     ageKey: 'от 5 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Петя — милый плюшевый ёжик с доброй улыбкой и грибочком на голове. Он обожает лесные прогулки и собирает свои любимые грибочки. Мягкий, уютный и безопасный — Петя станет верным другом ребёнку дома и в дороге.',
  // },
  // {
  //   id: 6,
  //   titleKey: 'Лисичка Сестричка-любит приключения',
  //   price: 6300,
  //   toyImage: toyFox,
  //   characteristic: {
  //     size: 55,
  //     materialKey: 'Велсофт (velsoft)',
  //     fillerKey: 'микрогранулы',
  //     ageKey: 'от 5 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Лисичка Сестричка — озорная и добрая путешественница. В своём нарядном платье и с корзинкой в лапках она готова к новым открытиям и лесным прогулкам. Мягкая, яркая и уютная — она вдохновляет малышей на игру и воображение.',
  // },
  // {
  //   id: 7,
  //   titleKey: 'Мышуля- собралась к тебе на день рождения',
  //   price: 4100,
  //   toyImage: toyHedgehog1,
  //   characteristic: {
  //     size: 35,
  //     materialKey: 'Эко-мех',
  //     fillerKey: 'синтепух',
  //     ageKey: 'от 3 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Мышуля — очаровательная плюшевая мышка с нежной улыбкой и добрым сердцем. Её круглые ушки, озорной бантик и мягкое платьице делают её идеальной спутницей для игр, сказок и уютных обнимашек. Мышуля любит цветы, дружбу и всегда приносит с собой тепло и радость.',
  // },
  // {
  //   id: 8,
  //   titleKey: 'Гена - футболист дарит настроение',
  //   price: 5700,
  //   toyImage: toyBoy,
  //   characteristic: {
  //     size: 55,
  //     materialKey: 'гипоаллергенный плюш',
  //     fillerKey: 'холлофайбер',
  //     ageKey: 'от 1 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Гена активный, добрый и всегда готов к игре — Гена вдохновляет на движение, дружбу и весёлые приключения. Мягкий, спортивный и обаятельный — он идеально подходит для игр, объятий и украшения детской комнаты.',
  // },
  // {
  //   id: 9,
  //   titleKey: 'Лягушка Квакушка-любит наряды',
  //   price: 4300,
  //   toyImage: toyFrog,
  //   characteristic: {
  //     size: 35,
  //     materialKey: 'Шенилл / софтвелюр',
  //     fillerKey: 'холлофайбер',
  //     ageKey: 'от 3 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Квакушка — модница среди плюшевых друзей. Её наряд с бабочками и стильный бантик делают её настоящей звездой детской коллекции. Мягкая, яркая и обаятельная — она вдохновляет малышей на игру и творчество.',
  // },
  // {
  //   id: 10,
  //   titleKey: 'Шарик-чемпион веселых игр в мячик',
  //   price: 5100,
  //   toyImage: toyDoggie,
  //   characteristic: {
  //     size: 45,
  //     materialKey: 'гипоаллергенный плюш',
  //     fillerKey: 'холлофайбер',
  //     ageKey: 'от 1 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Шарик — энергичный и добрый плюшевый пёсик, который обожает играть в мяч. Его спортивный дух, яркий наряд и дружелюбная мордашка вдохновляют малышей на движение и весёлые игры.',
  // },
  // {
  //   id: 11,
  //   titleKey: 'Кисуля Китти красотка в платье',
  //   price: 5700,
  //   toyImage: toyKitty,
  //   characteristic: {
  //     size: 45,
  //     materialKey: 'гипоаллергенный плюш',
  //     fillerKey: 'холлофайбер',
  //     ageKey: 'от 1 лет',
  //     packagingKey: 'подарочная коробка',
  //   },
  //   descriptionKey:
  //     'Кисуля Китти — настоящая модница! Её нарядное платье, выразительные глазки и нежная улыбка делают её любимицей девочек. Мягкая, стильная и уютная — она идеально подходит для игр, объятий и украшения детской комнаты.',
  // },
];
