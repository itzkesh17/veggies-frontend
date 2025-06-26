import { useNavigate } from "react-router-dom";
import './pagenotfoundCss.scss'


const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="notfound-container">
            <img src="/assets/404_page-not-found.png" alt="not found" />
            <p>The page you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')}>back to home</button>
        </div>
        </>
    )
}

export default PageNotFound;