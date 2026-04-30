// import { addSubscriberApi } from '@/api/subscribersApi';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// type Status = 'ready' | 'processing' | 'success' | 'error';

// type SubscriptionState = {
//   status: Status; //текущее состояние процесса.
//   error: string | null; //текст ошибки, если она произошла.
// };

// //Начальное состояние
// const initialState: SubscriptionState = {
//   status: 'ready', //ничего не происходит
//   error: null, //ошибки нет
// };

// // async thunk (вместо useEffect + try/catch)
// //* Создаём асинхронный thunk subscribeUser.
// //* Он принимает email и вызывает addSubscriberApi(email).
// //* Если запрос успешен — ничего не возвращает (тип void).
// //* Если ошибка — возвращает rejectWithValue, чтобы в состоянии можно было сохранить сообщение об ошибке.

// export const subscribeUser = createAsyncThunk<
//   void,
//   string,
//   { rejectValue: string }>('subscription/subscribeUser',
//     async (email, { rejectWithValue }) => {
//   try {
//     await addSubscriberApi(email);
//   } catch (e: any) {
//     return rejectWithValue(e.message || 'Ошибка подписки');
//   }
// });

// export const subscriptionSlice = createSlice({
//   name: 'subscription',
//   initialState,
//   reducers: {
//     resetStatus: (state) => {
//       state.status = 'ready';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(subscribeUser.pending, (state) => {
//         state.status = 'processing';
//         state.error = null;
//       })
//       .addCase(subscribeUser.fulfilled, (state) => {
//         state.status = 'success';
//       })
//       .addCase(subscribeUser.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload || 'Ошибка';
//       });
//   },
// });

// export const { resetStatus } = subscriptionSlice.actions;
// export default subscriptionSlice.reducer;
