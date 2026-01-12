import { useState } from 'react';
import { Button } from '../Button';
import styles from './Counter.module.scss';
import { CounterProps } from './type';

// export type CounterProps = {
//   value: number;
//   onIncrement: () => void;
//   onDecrement: () => void;
// }

//значение этой переменной не должно меняться "UPPERCASE_WITH_UNDERSCORES "
const MIN_VALUE = 1;
const MAX_VALUE = 100;

export function Counter({ value, onIncrement, onDecrement }: CounterProps) {
  return (
    <div className={styles.counterContainer}>
      <div className={styles.buttons}>
        <Button
          variant="primary"
          className={styles.button}
          onClick={onDecrement}
          disabled={value <= MIN_VALUE}
        >
          -
        </Button>
        <span>{value}</span>
        <Button
          variant="primary"
          className={styles.button}
          onClick={onIncrement}
          disabled={value >= MAX_VALUE}
        >
          +
        </Button>
      </div>
    </div>
  );
}

// //значение этой переменной не должно меняться "UPPERCASE_WITH_UNDERSCORES "
// const MIN_VALUE = 1;
// const MAX_VALUE = 100;

// export function Counter() {
//   // 1. Управление состоянием: используем useState
//   //    count - текущее значение, setCount - функция для его обновления
//   const [count, setCount] = useState(1); // Начальное значение счетчика - 1

//   // 2. Обработчик для кнопки "плюс"
//   const handlePlusClick = () => {
//     // Проверяем, не достигли ли мы максимума
//     if (count < MAX_VALUE) {
//       setCount((prevCount) => prevCount + 1); // Обновляем состояние, добавляя 1
//     }
//   };

//   // 3. Обработчик для кнопки "минус"
//   const handleMinusClick = () => {
//     // Проверяем, не достигли ли мы минимума
//     if (count > MIN_VALUE) {
//       setCount((prevCount) => prevCount - 1); // Обновляем состояние, вычитая 1
//     }
//   };

//   // 4. Рендеринг JSX (возвращаем структуру компонента)
//   return (
//     <div className={styles.counterContainer}>
//       <h1>{count}</h1> {/* Отображаем значение состояния count */}
//       <div className={styles.buttons}>
//         {/*
//           Кнопка "минус" будет заблокирована, если count <= MIN_VALUE
//           Кнопка "плюс" будет заблокирована, если count >= MAX_VALUE
//         */}
//         <Button
//           variant="primary"
//           className={styles.button}
//           onClick={handleMinusClick}
//           disabled={count <= MIN_VALUE} // Условная блокировка
//         >
//           -
//         </Button>
//         <Button
//           variant="primary"
//           className={styles.button}
//           onClick={handlePlusClick}
//           disabled={count >= MAX_VALUE} // Условная блокировка
//         >
//           +
//         </Button>
//       </div>
//     </div>
//   );
// }
