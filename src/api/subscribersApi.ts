export type TSubscriber = {
  id?: number;
  email: string;
};

// получить всех подписчиков
export const SubscribersApi = async (): Promise<TSubscriber[]> => {
  const res = await fetch('http://localhost:3001/subscribers');

  if (!res.ok) throw new Error('Ошибка загрузки подписчиков');

  return res.json();
};

//проверить есть ли email
export const checkSubscriberExistsApi = async (email: string) => {
  const res = await fetch(`http://localhost:3001/subscribers?email=${email}`);

  if (!res.ok) throw new Error('Ошибка проверки подписки');

  const data = await res.json();

  return data.length > 0;
};

// добавить подписчика
export const addSubscriberApi = async (email: string) => {
  //сначала проверяем
  const exists = await checkSubscriberExistsApi(email);

  if (exists) {
    throw new Error('Вы уже подписаны');
  }

  //  потом добавляем
  const res = await fetch('http://localhost:3001/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error('Ошибка подписки');

  return res.json();
};
