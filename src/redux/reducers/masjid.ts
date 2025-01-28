import {createSlice} from '@reduxjs/toolkit';
import {IReduxAction, IReduxMasjidState} from '../types';

const initialState = {
  data: null,
};
const MasjidSlice = createSlice({
  name: 'masjid',
  initialState,
  reducers: {
    setMasjidState: (state: any, action: IReduxAction<IReduxMasjidState>) => {
      state[action.payload?.key] = action.payload?.data;
    },
  },
});

export const {setMasjidState} = MasjidSlice.actions;
export default MasjidSlice.reducer;
