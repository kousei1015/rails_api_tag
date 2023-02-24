import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RootState } from "../../app/store";
import { LoginStatusResponse, SignRequest, SignResponse } from "../../models";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:3000";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (signUpParams: SignRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/sign_in`,
        signUpParams,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.headers;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422)
        return rejectWithValue(
          err.message +
            "バックエンドで実装されているバリデーションにより弾かれた可能性があります"
        );
      else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 404
      ) {
        return rejectWithValue(
          err.message +
            " axiosの第一引数で渡しているURLが正しいか確認して下さい"
        );
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (signUpParams: SignRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/auth`, signUpParams, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.headers;
    } catch (err: any) {
      if (isAxiosError(err) && err.response && err.response.status === 422)
        return rejectWithValue(
          err.message +
            "バックエンドで実装されているバリデーションにより弾かれた可能性があります"
        );
      else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 404
      ) {
        return rejectWithValue(
          err.message +
            " axiosの第一引数で渡しているURLが正しいか確認して下さい"
        );
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const getLoginStatus = createAsyncThunk(
  "auth/loginIs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<LoginStatusResponse>(
        `${apiUrl}/api/v1/auth/sessions`,
        {
          headers: {
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );
      if (res.data.is_login === true) {
        return res.data;
      } else if (res.data.is_login === false) {
        return rejectWithValue(
          "タイムアウトしたか、もしくはユーザーが存在しません。"
        );
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogined: false
  },

  reducers: {},

  extraReducers: (builder) => {

    //新規登録するための処理
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (
        action.payload?.["access-token"] &&
        action.payload?.["uid"] &&
        action.payload?.["client"]
      ) {
        state.isLogined = true;
        Cookies.set("access-token", action.payload["access-token"].toString());
        Cookies.set("uid", action.payload["uid"].toString());
        Cookies.set("client", action.payload["client"].toString());
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLogined = false;
      console.log(action.payload);
    });

    //ログインするための処理
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (
        action.payload?.["access-token"] &&
        action.payload?.["uid"] &&
        action.payload?.["client"]
      ) {
        state.isLogined = true;
        Cookies.set("access-token", action.payload["access-token"].toString());
        Cookies.set("uid", action.payload["uid"].toString());
        Cookies.set("client", action.payload["client"].toString());
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLogined = false;
      console.log(action.payload);
    });

    //ユーザーがログイン状態か判定しているかの処理
    builder.addCase(getLoginStatus.fulfilled, (state, action) => {
      state.isLogined = true
    });
    builder.addCase(getLoginStatus.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const selectLoginis = (state: RootState) => state.auth.isLogined

export default authSlice.reducer;
