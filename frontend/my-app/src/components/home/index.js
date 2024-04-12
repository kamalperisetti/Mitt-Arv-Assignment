import { useEffect, useState } from "react"
import ShowRecipes from "../ShowRecipes"
import {useNavigate} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const Home = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()
    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken === undefined){
        navigate("/")
    }
    console.log(jwtToken)
    useEffect(() => {
        getTheRecipes()
    }, [])
    const getTheRecipes =async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setRecipes(result.meals)
           
           
            
        } catch (error) {
            console.error(error);
        }
    }
    const logout = () => {
        navigate("/")
        Cookies.remove("jwt_token")

    }
    return(
        <div className="main-conainer"> 
            <div className="top-bar">
                <h1 className="heading">Food Recipes</h1>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <ul>
            {recipes.map((each) => (
                <ShowRecipes details = {each} />
            ))}
            </ul>
        </div>
    )
}

export default Home