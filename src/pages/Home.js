import React from 'react'
import {Image} from 'semantic-ui-react'



function Home() {

   
    console.log('Rendering Home')

    return (
        <React.Fragment>
            
            <div className='center logo-container'>
                
                <Image src={process.env.PUBLIC_URL + '/images/arcadia.png'}></Image>
                
            </div>
            <div class="merng-container">
                
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/mongo.png'} size='small'></Image></div>
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/node.png' } size='small'></Image></div>  
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/graphql.png'} size='tiny'></Image></div>
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/apollo.png'} size='small'></Image></div>
                <div className='rotate'><Image src={process.env.PUBLIC_URL + '/images/react.png'} size='tiny'></Image></div>
                
            </div>
        </React.Fragment>
        
    )
}



export default Home