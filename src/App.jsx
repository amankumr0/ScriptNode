import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import Layout from './Component/Layout';
import AddBlog from './Pages/AddBlog/AddBlog';
import MyBlog from './Pages/MyBlog/MyBlog';
import Register from './Pages/Register/Register';
import Blog from './Pages/Blog/Blog';
import Update from './Pages/Update/Update';



function App() {

  return (
    <div className='app-container'>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/add-blog' element={<AddBlog />} />
              <Route path='/my-blog' element={<MyBlog />} />
              <Route path="/post/:postId" element={<Blog />} />
              <Route path='/update/:postId' element={<Update />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App
