import './index.css'

const ShowRecipes = (props) =>  {
    const {details} = props
    let foodTitile = details.strTags
    if(details.strTags === null){
        foodTitile = "Name"
    }
    
    return(
        <div className="details">
            <h2 className='h2'>{foodTitile}</h2>
            <div className='img-ingr'>
                <img className='image' src = {details.strMealThumb} alt = {details.strTags} /><br/>
                <div>
                    <div className='ing'>
                        <b className='b'>Ingreduents</b>
                        <p className='pp'>{details.strIngredient1}( {details.strMeasure1} ), {details.strIngredient2}({details.strMeasure2}), {details.strIngredient3}({details.strMeasure3}), {details.strIngredient4}({details.strMeasure4}), {details.strIngredient5}({details.strMeasure5}), {details.strIngredient6}({details.strMeasure6}), {details.strIngredient7}({details.strMeasure7})
                        {details.strIngredient8}({details.strMeasure8}), {details.strIngredient9}({details.strMeasure9}), {details.strIngredient10}({details.strMeasure10}), {details.strIngredient11}({details.strMeasure11}), {details.strIngredient12}({details.strMeasure12}), {details.strIngredient13}({details.strMeasure13}), {details.strIngredient14}({details.strMeasure14}), {details.strIngredient15}({details.strMeasure15}) 
                        </p>
                    </div>
                
                    <div className='ing'>
                        <b className='b'>
                            Making Process
                        </b>
                        <p className='ppp'>{details.strInstructions}</p>
                        <b className='b'>Making Video</b><br />
                        <a className='link' href={details.strYoutube} target='__blank'>{details.strYoutube}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowRecipes