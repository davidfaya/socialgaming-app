import React, {useContext} from 'react'
import {Image} from 'semantic-ui-react'
import {AuthContext} from '../context/auth'


function Home() {
    const {user} = useContext(AuthContext)

    console.log('Rendering Home')

    return (
        <React.Fragment>
           
            <div className='center logo-container'>
                {user? (<h3>Welcome {user.username}!</h3>):(<div><h3>Welcome!</h3></div>)}   
            </div>
            <div class="home-container">
                <div class="circle"><Image src={process.env.PUBLIC_URL + '/images/mongo.png'} size='small'></Image></div>
                <div class="circle circle2"><Image src={process.env.PUBLIC_URL + '/images/node.png'} size='small'></Image></div>
                <div class="circle circle3"><Image src={process.env.PUBLIC_URL + '/images/graphql.png'} size='small'></Image></div>
                <div class="circle circle4"><Image src={process.env.PUBLIC_URL + '/images/apollo.png'} size='small'></Image></div>
                <div class="circle circle5"><Image src={process.env.PUBLIC_URL + '/images/react.png'} size='small'></Image></div>
            </div>
            
            {/* <div class="merng-container">
                
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/mongo.png'} size='small'></Image></div>
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/node.png' } size='small'></Image></div>  
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/graphql.png'} size='tiny'></Image></div>
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/apollo.png'} size='small'></Image></div>
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/react.png'} size='tiny'></Image></div>
                
            </div> */}
        </React.Fragment>
        
    )
}



export default Home