
import { BrowserRouter as Router, Route} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { Container } from 'semantic-ui-react'

import MenuBar from './components/MenuBar'
import Navbar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SinglePost from './pages/SinglePost'

import {AuthProvider} from './context/auth'
import { AuthRoute } from './utils/authRoute'
import { PostsProvider } from './context/posts';


function App() {


  console.log('')
  return (
    <AuthProvider>
    <PostsProvider>
      <Router>
        <Container>
          <MenuBar /> 
          <Navbar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/signup' component={SignUp} />     
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container> 
      </Router>
    </PostsProvider>
    </AuthProvider>

  )
}

export default App;
