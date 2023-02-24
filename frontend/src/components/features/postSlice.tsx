import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { RootState } from "../../app/store";
import {
  GetPosts,
  APIPostResponse,
  ToFavListResponse,
  PostRequest,
  PostResponse,
  GetFavList,
  ToFavListRequest,
} from "../../models";

const apiUrl = "http://localhost:3000";

export const getPosts = createAsyncThunk(
  "post/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<GetPosts>(`${apiUrl}/api/v1/posts.json`, {
        headers: {
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
          "access-token": Cookies.get("access-token"),
        },
      });
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 404) {
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

export const createPost = createAsyncThunk(
  "post/new",
  async (newPost: PostRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post<APIPostResponse<PostResponse>>(
        `${apiUrl}/api/v1/posts.json`,
        newPost,
        {
          headers: {
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );

      return res.data;
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

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/v1/posts/${id}.json`, {
        headers: {
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
          "access-token": Cookies.get("access-token"),
        },
      });
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 404) {
        return rejectWithValue(
          err.message +
            " axiosの第一引数で渡しているURLが正しいか、渡している`${id}`に間違いがないか確認して下さい"
        );
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const getFavoriteList = createAsyncThunk(
  "post/favorite/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<GetFavList>(
        `${apiUrl}/api/v1/favorites.json`,
        {
          headers: {
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 404) {
        return rejectWithValue(
          err.message +
            " axiosの第一引数で渡しているURLが正しいか確認して下さい"
        );
      } else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 401
      ) {
        return rejectWithValue(
          err.message +
            " ログアウト状態になっています。お気に入り機能を使うにはログインする必要があります"
        );
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const createFavoriteList = createAsyncThunk(
  "post/favorite/post",
  async (post: ToFavListRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post<APIPostResponse<ToFavListResponse>>(
        `${apiUrl}/api/v1/favorites.json`,
        post,
        {
          headers: {
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );
      return res.data;
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
      } else if (
        isAxiosError(err) &&
        err.response &&
        err.response.status === 401
      ) {
        return rejectWithValue(
          err.message +
            " ログアウト状態になっています。お気に入り機能を使うにはログインする必要があります"
        );
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const deleteFavoriteList = createAsyncThunk(
  "post/favorite/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/v1/favorites/${id}.json`, {
        headers: {
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
          "access-token": Cookies.get("access-token"),
        },
      });
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 404) {
        return rejectWithValue(
          err.message +
            " axiosの第一引数で渡しているURLが正しいか、渡している`${id}`に間違いがないか確認して下さい"
        );
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [
      {
        id: 0,
        title: "",
        tags: [
          {
            id: 0,
            name: "",
          },
        ],
      },
    ],
    favList: [
      {
        id: 0,
        user_id: 0,
        post_id: 0,
        title: "",
        tags: [
          {
            id: 0,
            name: "",
          },
        ],
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    /* 投稿一覧を取得するための処理 */
    builder.addCase(getPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.payload);
    });

    // 新しく投稿した時、エラーがあった際には、console.logにそのメッセージを表示するための処理
    builder.addCase(createPost.rejected, (state, action) => {
      console.log(action.payload);
    });

    // 削除ボタンが押された瞬間、画面からもその投稿が消えるための処理。これを書かないと、削除ボタンを押しても、リロードしないと画面に反映されない。
    builder.addCase(deletePost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.meta.arg),
      };
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      console.log(action.payload);
    });

    // お気に入りリストを取得するための処理
    builder.addCase(getFavoriteList.fulfilled, (state, action) => {
      return {
        ...state,
        favList: action.payload,
      };
    });
    builder.addCase(getFavoriteList.rejected, (state, action) => {
      console.log(action.payload);
    });

    // お気に入りリストへ登録
    builder.addCase(createFavoriteList.fulfilled, (state, action) => {
      return {
        ...state,
        favList: [...state.favList, action.payload.data as ToFavListResponse],
      };
    });
    builder.addCase(createFavoriteList.rejected, (state, action) => {
      console.log(action.payload);
    });

    // お気に入りリストから外すための処理。これを書かないとasyncDeletePost同様、削除ボタンを押しても、リロードしないと画面に反映されない。
    builder.addCase(deleteFavoriteList.fulfilled, (state, action) => {
      return {
        ...state,
        favList: [...state.favList.filter((fav) => fav.id !== action.meta.arg)],
      };
    });
    builder.addCase(deleteFavoriteList.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const selectPosts = (state: RootState) => state.post.posts;
export const selectFavList = (state: RootState) => state.post.favList;

export default postSlice.reducer;
