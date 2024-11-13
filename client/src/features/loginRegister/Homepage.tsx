import {Link} from 'react-router-dom'


const Homepage = () => {
    return (
        <>
        <nav>
        <Link to='/login'><button className='navButton'>Login</button></Link>
        <Link to='/register'><button className='navButton'>Register</button></Link>
        </nav>
        <div className='main'>
        <h1>Welcome to Bookworm!</h1>
        <img id='logo_image'src='/bookworm.png' width={450} />
        </div>
        </>
    )
}

export default Homepage;