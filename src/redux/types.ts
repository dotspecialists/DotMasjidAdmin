import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IStore {
  dispatch: ThunkDispatch<IReduxState, void, UnknownAction>;
  getState: () => IReduxState;
}
export type IReduxMasjidState = "data";
export type IReduxAuthState = "token" | "user";

export type IReduxAction<T> = {
  type: string;
  payload: {
    key: T;
    data: any;
  };
};

export type IReduxState = Record<IReduxMasjidState | IReduxAuthState, any>;
export interface IReduxSlice {
  masjid: Record<IReduxMasjidState, any>;
  auth: Record<IReduxAuthState, any>;
}
