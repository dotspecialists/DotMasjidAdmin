import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IStore {
  dispatch: ThunkDispatch<IReduxState, void, UnknownAction>;
  getState: () => IReduxState;
}
export type IReduxMasjidState = "data";

export type IReduxAction<T> = {
  type: string;
  payload: {
    key: T;
    data: any;
  };
};

export type IReduxState = Record<IReduxMasjidState, any>;
export interface IReduxSlice {
  masjid: Record<IReduxMasjidState, any>;
}
