import { Link } from 'react-router'

function Errorpage() {
    return(
        <>
            <h1>This page does not exist</h1>
            <Link to="/">Back to Homepage</Link>
        </>
    )
}

export default Errorpage