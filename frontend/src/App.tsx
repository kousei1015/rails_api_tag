import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import FavoriteList from "./components/FavoriteList";
import SignUp from "./components/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
