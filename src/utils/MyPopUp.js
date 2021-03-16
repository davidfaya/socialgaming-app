import {Popup} from 'semantic-ui-react'
import React  from 'react'

function MyPopUp(props) {
    const {content, children} = props

    return <Popup inverted content={content} trigger={children} />

}

export default MyPopUp