import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AddEditor from './Component/Add Blog/AddEditor';
import TravelBlog from './Component/Home/Home';
import TravelBlogComponent from './Component/Blog Page/TravelBlogComponent';
import Register from './Component/Auth/Register';
import FullBlog from './Component/Blog Page/FullBlog';
import AddBlog from './Component/Add Blog/AddBlog';
import Signin from './Component/Auth/Signin';
import PilingComponent from './Component/Home/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<TravelBlog/>}/>
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog-page/:id" element={<TravelBlogComponent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/all-blogs/:num" element={<FullBlog />} />
          <Route path='/test' Component={PilingComponent}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
