//1. создаем базовый адрес DRY(не повторяйся)
const BASE_URL = 'http://localhost:3001';

export const getCartApi = async () => {
  const res = await fetch(`${BASE_URL}/cart`);
  if (!res.ok) throw new Error('Ошибка загрузки корзины');
  return res.json();
};

export const addToCartApi = async (
  existingItem: { id: number; quantity: number } | null,
  toyId: number
) => {
  // 1. Выбираем путь (адрес)
  const url = existingItem
    ? `${BASE_URL}/cart/${existingItem.id}`
    : `${BASE_URL}/cart`;

  // 2. Отправляем запрос с настройками
  const res = await fetch(url, {
    method: existingItem ? 'PATCH' : 'POST', // 3. Выбираем метод Если товар есть — PATCH (меняем), если нет — POST (создание)
    headers: { 'Content-Type': 'application/json' }, // 4. Говорим, что несем данные
    body: JSON.stringify(
      // 5. Упаковываем данные
      existingItem
        ? { quantity: existingItem.quantity + 1 } //Если обновляем: передаем только новую порцию quantity
        : { toyId, quantity: 1 } //Если создаем: передаем toyId и первую единицу товара.
    ),
  });
  if (!res.ok) throw new Error('Ошибка добавления в корзину');
};

export const removeFromCartApi = async (existingItem: {
  id: number;
  quantity: number;
}) => {
  const url = `${BASE_URL}/cart/${existingItem.id}`; // 1. всегда удаляем по ID конкретную вещь, которая уже лежит в корзине,

  const res = await fetch(url, {
    method: existingItem.quantity > 1 ? 'PATCH' : 'DELETE', // 2. Либо правим, либо удаляем совсем
    headers: { 'Content-Type': 'application/json' },
    body:
      existingItem.quantity > 1
        ? JSON.stringify({ quantity: existingItem.quantity - 1 }) // 3. Уменьшаем
        : undefined, // 4. Для DELETE тело не нужно
  });

  if (!res.ok) throw new Error('Ошибка удаления из корзины');
};

//! export const getCartApi = async () => {
//! const res = await fetch(`${BASE_URL}/cart`);
//! if(!res.ok) throw new Error('Ошибка загрузки корзины');
//! return res.json();
//! }
//1 async - Эта функция не мгновенная! Она будет ждать ответа от сервера, поэтому не блокируеь остальную работу сайта

//2 fetch- отправляем курьера по адресу http://localhost:3001/cart.

//2 await- говорим программе: «Стой здесь и жди, пока курьер вернется с ответом».

//2 res- Сокращение от Response — интерфейс в Fetch API JavaScript, который представляет ответ от сервера на запрос. Объект Response возвращается в качестве результата функции fetch().

//3 (!res.ok) - Если сервер прислал ошибку (например, 404 или 500), то res.ok будет false.

//3 throw new Error - Если всё плохо, выбрасывает ошибку. Это важно: именно этот «бросок» заставит сработать блок catch в хуке, который в итоге покажет сообщение пользователю.

// 4 res.json() - Курьер вернул коробку, но данные в ней запакованы в формат JSON (как сжатый архив). Эта команда «распаковывает» их в обычный массив объектов.

//!  const url = existingItem
//!     ? `${BASE_URL}/cart/${existingItem.id}`
// !    : `${BASE_URL}/cart`;
//! Выбор URL (const url = ...): Здесь работает "умный адрес". Если existingItem (товар уже в корзине) есть, мы добавляем его id в конец адреса, чтобы сервер знал, кого именно обновлять. Если нет — идем просто в /cart.
// Выбор URL (const url = ...): Здесь работает "умный адрес". Если existingItem (товар уже в корзине) есть, мы добавляем его id в конец адреса, чтобы сервер знал, кого именно обновлять. Если нет — идем просто в /cart.
