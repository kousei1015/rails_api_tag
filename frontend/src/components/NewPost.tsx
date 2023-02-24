import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createPost } from "./features/postSlice";
const NewPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = {
      title,
      tags,
    };
    await dispatch(createPost(packet));
  };
  return (
    <div>
      <form>
        <div className="flex flex-col">
          <p className="my-4">タイトル</p>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
          <p className="my-4">
            タグ(タグを複数付けるときは、「,」で区切ってください)
          </p>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTags(e.target.value)
            }
            value={tags}
          />
          <button onClick={handleSubmit} className="mt-5">
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
