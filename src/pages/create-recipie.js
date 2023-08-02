import {useState} from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {userOwner} from '../custom-hooks/userOwner.js'
import { useCookies } from 'react-cookie';

export const CreateRecipie = () => {

    const userId = userOwner();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);
    const [recipie, setRecipie ] = useState({
        name: "",
        ingredients: [],
        instruction: "",
        imageURL: "",
        time:0,
        userOwner: userId //This field is obtained from the localstorage where an userID is created when logged in and we use that userID to this userOwner field....For more refer post request of login

    });

    const handleSubmit = (event) => {
        const {name, value} = event.target;
        setRecipie({...recipie, [name]: value});
    }

    const addIngredient = () => {
        setRecipie({...recipie, ingredients: [...recipie.ingredients, ""]});
    }

    const handleAddIngredient = (index,event) => {
        //Basically here we are creating a copy of the ingredients array before adding it and then assigning the last value to the last empty string that we created when the button is clicked ie addIngredient() 
        const {value} = event.target;
        const ingredients = recipie.ingredients;
        ingredients[index] = value;
        setRecipie({...recipie,ingredients});
    }
   // console.log(recipie);

    const onSubmit = async(event) => {
        event.preventDefault();
        if(!recipie.userOwner) {
            alert('No userOwner field');
            return ;
        }
        try {
            await Axios.post("http://localhost:5000/recipie", recipie, {headers: {authorization: cookies.access_token }});
            alert('Recipie Created');
            navigate('/');
        } catch (error) {
            console.log(error);
        }

    }

    return <div className="create-recipe">
        <h1>Create Recipie</h1>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name='name' onChange={handleSubmit} className='createRecipie__input'/>

            <label htmlFor="ingredients">Ingredients</label>
            {recipie.ingredients.map((ingredient, index) => {
                     
                               return  <input type='text' name='ingredients' key={index} value={ingredient} onChange={(event) => handleAddIngredient(index, event)} className='createRecipie__input'/>

                
            })}
            
            <button onClick={addIngredient} type='button'>Add Ingredient</button>

            <label htmlFor="instruction">Instruction</label>
            <textarea type="text" id="instruction" name='instruction' onChange={handleSubmit} className='createRecipie__textarea'/>

            <label htmlFor="imageURL">Image URL</label>
            <input type="text" id="imageURL" onChange={handleSubmit} name='imageURL' className='createRecipie__input'/>

            <label htmlFor="time">Duration (in min)</label>
            <input type="number" id="time" onChange={handleSubmit} name='time' className='createRecipie__input'/>
            <br></br>
            <br></br>
            <button type='submit'>Create Recipie</button>
        </form>
    </div>
}