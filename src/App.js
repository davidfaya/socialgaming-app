
import { BrowserRouter as Router, Route} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { Container } from 'semantic-ui-react'

//import MenuBar from './components/MenuBar'
import Navbar from './components/NavBar'
import Posts from './pages/Posts'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SinglePost from './pages/SinglePost'
import Profile from './pages/Profile'

import {AuthProvider} from './context/auth'
import  AuthRoute from './utils/authRoute'
import { PostsProvider } from './context/posts';
import {UsersProvider} from './context/users'


function App() {


  console.log('')
  return (
    <AuthProvider>
    <PostsProvider>
    <UsersProvider>
      <Router>
        <Container>
          {/* <MenuBar />  */}
          <Navbar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/posts' component={Posts} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/signup' component={SignUp} />   
          <AuthRoute exact path='/profile' component={Profile} />       
          <AuthRoute exact path='/posts/:postId' component={SinglePost} />
        </Container> 
      </Router>
    </UsersProvider>
    </PostsProvider>
    </AuthProvider>

  )
}

export default App;
