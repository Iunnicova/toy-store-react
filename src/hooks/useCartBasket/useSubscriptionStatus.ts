import { useEffect, useState } from 'react';

type Status = 'ready' | 'processing' | 'success' | 'error';

export const useSubscriptionStatus = () => {
  const [status, setStatus] = useState<Status>('ready');

  // Загружаем статус из localStorage при монтировании
  useEffect(() => {
    const savedStatus = localStorage.getItem('purchaseStatus') as Status | null;
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  // Сохраняем статус в localStorage при каждом изменении
  useEffect(() => {
    if (status === 'success') {
      localStorage.setItem('purchaseStatus', status);
    } else {
      localStorage.removeItem('purchaseStatus');
    }
  }, [status]);

  // Функция для закрытия сообщения (по крестику)
  const closeSuccessMessage = () => {
    setStatus('ready');
    localStorage.removeItem('purchaseStatus');
  };

  return {
    status,
    setStatus,
    closeSuccessMessage,
  };
};
