import { Route, Routes } from 'react-router-dom';

import MainPage from './router/MainPage';
import TestPage from './router/TestPage';
import SamplePage from './router/SamplePage';
import PostPage from './router/PostPage';

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/sample" index element={<SamplePage />} />
        <Route path="/post">
          <Route path=":postId" element={<PostPage />} />
        </Route>
      </Routes>
    </div>
  );
}