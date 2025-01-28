// import {createAsyncThunk} from '@reduxjs/toolkit';
// import {login, register} from '../NetworkCalls/auth';
// import {endPoints} from '../utils/constant';

// export const apiReducer = createAsyncThunk(
//   'auth/apiReducer',
//   async (data, {rejectWithValue}) => {
//     try {
//       console.log('🚀 ~ data.endPoint:', data?.endPoint);
//       const response = await endPoints[data?.endPoint](data?.body);
//       console.log('🚀 ~ response.result:', response.result);
//       if (Object.keys(response.result).includes('data')) {
//         console.log('... apiReduer-1:', Object.keys(response.result));
//         return response.result.data;
//       } else {
//         console.log('... apiReduer-2:', Object.keys(response.result));
//         return response.result;
//       }
//     } catch (error) {
//       console.log('🚀 ~ (error.result:', error.result);
//       return rejectWithValue(error.result);
//     }
//   },
// );
