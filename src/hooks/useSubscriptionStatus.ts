import { addSubscriberApi } from '@/api/subscribersApi';
import { useEffect, useState } from 'react';

type Status = 'ready' | 'processing' | 'success' | 'error';

export const useSubscriptionStatus = () => {
  const [status, setStatus] = useState<Status>('ready');
  const [error, setError] = useState<string | null>(null);

  // При загрузке проверяем только успех (чтобы не показывать старые ошибки)
  useEffect(() => {
    const savedStatus = localStorage.getItem('purchaseStatus') as Status | null;
    if (savedStatus === 'success') {
      setStatus('success');
    }
  }, []);

  // Сохраняем в память только успешную подписку
  useEffect(() => {
    if (status === 'success') {
      localStorage.setItem('purchaseStatus', 'success');
    } else {
      localStorage.removeItem('purchaseStatus');
    }
  }, [status]);

  //обработка подписки

  const handleSubscription = async (
    email: string,
    apiCall: (email: string) => Promise<any>
  ) => {
    try {
      setStatus('processing'); // Включаем лягушку
      setError(null);

      await apiCall(email); // Ждем реальный ответ от сервера

      //  пауза, чтобы лягушка успела поработать
      setTimeout(() => {
        setStatus('success');
      }, 3000); // 3 секунды на показ лягушки

      return true;
    } catch (e: any) {
      setError(e.message || 'Ошибка подписки');
      setStatus('error');
      return false;
    }
  };

  // Функция для закрытия сообщения (по крестику)
  const closeSuccessMessage = () => {
    setStatus('ready');
    setError(null);
    localStorage.removeItem('purchaseStatus');
  };

  return {
    status,
    error,
    setStatus,
    setError,
    handleSubscription,
    closeSuccessMessage,
  };
};
