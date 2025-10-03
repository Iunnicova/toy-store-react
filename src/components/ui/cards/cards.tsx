// import React, { FC } from 'react';
import {
  styles,
  basketIcon,
  searchIcon,
  heartIconCards,
  toyBee,
  toyTiger,
  toySquirrel,
  toyHedgehog,
  Button,
  NavLink,
  TCardsProps,
  toyBunny,
  toyGirl,
  toyFrog,
  toyFox,
  // toyBoy,
  toyDoggie,
  toyHedgehog1,
  toyKitty,
  toyButterfly,
} from './index';

export const Cards = ({ title }: TCardsProps) => (
<section>
    <div>
      <h2>{title}Все любимки вместе!</h2>

       <NavLink to="/favorites" className={styles.navigation}>
                  <Button onClick={() => alert('Поиск')} className={styles.button}>
                    <img src={searchIcon} alt="Поиск" className={styles.icon} />
                    <p className={styles.count}>Поиск</p>
                  </Button>
                </NavLink>
    </div>




    <article className={styles.card}>
      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              height="40"
              width="40"
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              className={styles.toy}
              src={toyBee}
              height="150"
              width="150"
              alt="Пчела"
            />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Милашка Луна-дарит волшебный мёд</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>5&nbsp;900&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyTiger} alt="Тигр" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Тигруша Красавчик хранитель мечты</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>4&nbsp;900&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toySquirrel} alt="Белка" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Бельчонок Белла любит орешки</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>6&nbsp;100&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyHedgehog} alt="Ёжик" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Ёжик Петя-любитель грибочков</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>5&nbsp;100&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyBunny} alt="Зайка" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Зайка Попрыгайка- сказочница</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>5&nbsp;700&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyGirl} alt="Кукла" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Кукла Ляля - приглашает дружить</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>4&nbsp;900&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyFrog} alt="Лягушка" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Лягушка Квакушка-любит наряды</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>4&nbsp;300&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyFox} alt="Лисенок" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Лисичка Сестричка-любит приключения</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>6&nbsp;300&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyDoggie} alt="Собачка" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Шарик-чемпион веселых игр в мячик</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>5&nbsp;100&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyHedgehog1} alt="Ёж" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Жора- ёжик с веселым хвостиком</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>4&nbsp;100&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyKitty} alt="Кошка" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Кисуля Китти красотка в платье</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>5&nbsp;700&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.imgCards}>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img
              src={heartIconCards}
              className={styles.heartIconCards}
              alt="Закладки"
            />
          </NavLink>
          <NavLink
            to="/" //! обязательный проп: куда ведёт ссылка
          >
            <img className={styles.toy} src={toyButterfly} alt="Бабочка" />
          </NavLink>
        </div>
        <div className={styles.description}>
          <p className={styles.title}>Бабочка Фея подарит сладкие сны</p>
        </div>
        <div className={styles.price}>
          <span>Цена:</span>
          <strong>5&nbsp;700&nbsp;₽</strong>
          <NavLink to="/">
            <Button onClick={() => alert('Корзина')} className={styles.button}>
              <img src={basketIcon} alt="Корзина" className={styles.icon} />
            </Button>
          </NavLink>
        </div>
      </div>
    </article>
</section>

);

//  &nbsp - чтобы 5 900 не переносилось
