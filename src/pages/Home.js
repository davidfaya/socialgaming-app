import React, {useContext} from 'react'
import {Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth'


function Home() {
    const {user} = useContext(AuthContext)
    
    console.log('Rendering Home')

    return (
        <React.Fragment>
           
           
            <div className="home-container" id="parent">
                {!user && (
                    <div className="home-buttons" align="center"> 
                        <Link  to="/login" className='btn'>Login</Link>
                        <Link  to="/signup" className='btn'>Sign Up</Link>
                    </div>
                )}
                <div className="circle"><Image src={process.env.PUBLIC_URL + '/images/mongo.png'} width="100px"></Image></div>
                <div className="circle circle2"><Image src={process.env.PUBLIC_URL + '/images/node.png'} width="100px"></Image></div>
                <div className="circle circle3"><Image src={process.env.PUBLIC_URL + '/images/graphql.png'} width="100px"></Image></div>
                <div className="circle circle4"><Image src={process.env.PUBLIC_URL + '/images/apollo.png'} width="100px"></Image></div>
                <div className="circle circle5"><Image src={process.env.PUBLIC_URL + '/images/react.png'} width="100px"></Image></div>
            
            </div>
            
            
        </React.Fragment>
        
    )
}



export default Home