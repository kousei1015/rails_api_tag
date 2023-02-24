import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  createFavoriteList,
  getFavoriteList,
  deletePost,
  deleteFavoriteList,
  selectPosts,
  selectFavList,
} from "./features/postSlice";
import { getLoginStatus, selectLoginis } from "./features/authSlice";
import { AppDispatch } from "../app/store";

const Post = () => {
  const posts = useSelector(selectPosts);
  const favsList = useSelector(selectFavList);
  const isLogined = useSelector(selectLoginis);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      const loginStatus = await dispatch(getLoginStatus());

      // ログインしていない、もしくはタイムアウトしたと判断された場合には投稿一覧を表示するためのリクエストを送り、お気に入りリストを表示するためのリクエストを送らないようにしている
      if (getLoginStatus.rejected.match(loginStatus)) {
        await dispatch(getPosts());
      }

      await dispatch(getPosts());
      await dispatch(getFavoriteList());
    };
    fetchPosts();
  }, [dispatch]);

  const isFavorited = (postId: number) => {
    const match = favsList.find((fav) => fav.post_id === postId);
    return match ? true : false;
  };

  const handleFavorited = (postId: number, isFavorite: boolean) => {
    if (isFavorite) {
      const findedPost = favsList.find((fav) => fav.post_id === postId);
      const finedPostId = findedPost?.id as number;
      dispatch(deleteFavoriteList(finedPostId));
    } else {
      const packet = {
        post_id: postId,
      };
      dispatch(createFavoriteList(packet));
    }
  };

  return (
    <>
      {isLogined ? (
        <Link
          to="/favorites"
          className="text-center text-slate-100 hover:text-slate-300 block mt-6 text-2xl"
        >
          登録中のことわざは
          <span className="border border-gray-700 rounded-full bg-gray-700 inline-block w-7 h-7 mx-1">
            {favsList.length}
          </span>
          個です
        </Link>
      ) : (
        <Link
          to="/"
          className="text-center text-slate-100 hover:text-slate-300 block mt-6 text-2xl"
        >
          ログイン画面へ
        </Link>
      )}

      <h1 className="my-6 text-center">投稿一覧</h1>
      <div className="w-full max-w-3xl mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-white-500 rounded mb-8 text-center"
          >
            <div className="m-5">
              <h2 className="text-3xl">{post.title}</h2>
              <div className="flex">
                {post.tags.map((tag, index) => (
                  <p className="mb-5 text-xl" key={index}>
                    #{tag.name}
                  </p>
                ))}
              </div>
              <div>
                <>
                  {isFavorited(post.id) ? (
                    <button
                      className="mx-3.5 bg-blue-600"
                      onClick={() => handleFavorited(post.id, true)}
                    >
                      お気に入りに登録済
                    </button>
                  ) : (
                    <button
                      className="mx-3.5"
                      onClick={() => handleFavorited(post.id, false)}
                    >
                      未登録
                    </button>
                  )}
                </>
                <button
                  onClick={() => dispatch(deletePost(post.id))}
                  className="bg-red-600"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
