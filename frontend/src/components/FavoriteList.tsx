import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  getFavoriteList,
  deleteFavoriteList,
  selectFavList,
} from "./features/postSlice";
const FavoriteList = () => {
  const dispatch: AppDispatch = useDispatch();
  const favsList = useSelector(selectFavList);

  useEffect(() => {
    const fetchFavList = async () => {
      await dispatch(getFavoriteList());
    };
    fetchFavList();
  }, [dispatch]);

  return (
    <div className="text-center">
      <Link
        to="/posts"
        className="text-center text-slate-100 hover:text-slate-300 block mt-6 text-3xl"
      >
        投稿一覧へ
      </Link>
      <h1 className="my-6">お気に入りリスト</h1>
      {favsList.map((fav) => (
        <div className="w-full max-w-3xl border border-white-500 rounded mb-8 mx-auto">
          <div className="m-5">
            <h2 className="text-3xl my-4">{fav.title}</h2>
            <div>
              {fav.tags.map((tag) => (
                <p>#{tag.name}</p>
              ))}
            </div>
            <button
              className="bg-blue-600 mt-3"
              onClick={() => dispatch(deleteFavoriteList(fav.id))}
            >
              お気に入り登録を解除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;
