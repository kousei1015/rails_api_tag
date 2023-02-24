import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { loginUser } from "./features/authSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = {
      email,
      password,
    };
    dispatch(loginUser(packet));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-3xl text-center font-bold">ログイン画面</h1>
        <Link
          to="/signUp"
          className="text-white inline-block mt-2 mb-4 border-b-2 hover:text-gray-300"
        >
          新規登録画面へ(初めての方はこちら)
        </Link>
        <form>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="m-3.5 p-2.5"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Eメールを入力して下さい"
            />
            <input
              type="text"
              className="m-3.5 p-2.5"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力して下さい"
            />
            <div>
              <button className="bg-blue-600 w-2/6" onClick={handleSubmit}>
                送信
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
