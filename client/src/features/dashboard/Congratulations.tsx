
import { useNavigate } from 'react-router-dom';

const Congratulations = () => {
    const navigate = useNavigate();
    const randomNumber = Math.floor(Math.random() * (13)) + 1;

    return (
        <>
        <h1>Congratulations!</h1>
        <img src={`../../../congratulations/congratulations${randomNumber}.webp`}/>
        <p>Would you like to add a review?</p>
        <button>Yes</button>
        <button onClick={()=>{navigate('/dashboard')}}>No</button>
        </>
    )
}

export default Congratulations;