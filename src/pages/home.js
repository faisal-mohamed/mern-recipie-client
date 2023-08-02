import { useEffect, useState } from 'react';
import Axios from 'axios';
import {userOwner} from '../custom-hooks/userOwner.js';
import {useCookies, withCookies} from 'react-cookie';

export const Home = () => {

    const [recipies, setRecipies] = useState([]); //This state is used to manage all the recipies inside home page
    const [savedRecipies, setSavedRecipies] = useState([]); //This state is used to manage all the saved recipies inside saved Recipies
    const userID = userOwner();
    const [cookies, _] = useCookies(["access_token"]);

    useEffect(()=> {
        const fetchRecipies = async() => {
            try {
                const response = await Axios.get("https://mern-recipie-server.onrender.com/recipie");
                setRecipies(response.data);
                console.log( response.data)
            } catch (error) {
                console.log(error);
            }
        }

        const fetchSavedRecipies = async() => {
            try {
                
                const response = await Axios.get(`https://mern-recipie-server.onrender.com/recipie/saved-recipies/ids/${userID}`);
               // console.log(response.data);
               setSavedRecipies(response.data.savedRecipies);

            } catch (error) {
                console.log(error);
            }
        }

        fetchRecipies();

        //This enables to fetch saved recipies only if user is logged in
        if(cookies.access_token) {
            fetchSavedRecipies();
        }
        
    }, []);

    const saveRecipie = async(recipieID) => {

        try {
            const response =await  Axios.put("https://mern-recipie-server.onrender.com/recipie", {recipieID, userID}, {headers: {authorization: cookies.access_token }});
           alert('Recipie Saved :)')
           // console.log(response.data);
           setSavedRecipies(response.data.savedRecipies);
        } catch (error) {
            console.log(error);
        }
    }

    const isRecipieSaved = (id) => {
        if(savedRecipies.includes(id)) {
            return true;
        } 
        return false;
    }

   
    // custom Code for deleting operation
    const deleteRecipe = async (recipeID) => {
        try {
          const response = await Axios.delete(`https://mern-recipie-server.onrender.com/recipie/${recipeID}`,  {
            headers: { authorization: cookies.access_token },
          });
          alert('Recipe Deleted :)');
          // Perform any necessary update after successful deletion
          setRecipies((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeID));

        } catch (error) {
            if(error.response && error.response.status === 403) {
                alert('You are not authorized to delete this recipie since it was not created by you :(');
            }
          console.log(error);

        }
      };

      
  const isRecipeCreatedByUser = (recipe) => {
    return recipe.userOwner === userID;
  };
  
    
    return <div>

        <h1 className='h1__recipie'>Recipies</h1>
        
            <ul>

            
          
                {recipies.map((recipie) => {

                const isCreatedByUser = isRecipeCreatedByUser(recipie);
                const liClassName = isCreatedByUser ? 'li__recipiehome-user' : 'li__recipiehome-common';
                    return (
                        <blockquote>
                    <li key={recipie._id} className={liClassName}>
                     
                        <div>
                            <h2 className='h2__recipiehome'>{recipie.name}</h2>
                        </div>


                           
                        
                        <img src={recipie.imageURL} alt={recipie.name} className='img__recipiehome' />
                       <br></br><br></br>
                        
                      
                        <ul className='ul__ingredients'>
                                {recipie.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                                ))}
                        </ul>

                        <div className='p'>
                            {recipie.instruction}
                        </div>
                        
                        <div className='time__recipiehome'>
                           <h3>Duration: {recipie.time} minutes</h3>
                        </div>
                        {!isRecipieSaved(recipie._id) && <button onClick={()=>saveRecipie(recipie._id)} >Save Recipie</button>}
                        {savedRecipies.includes(recipie._id) && <h3>Recipie Saved</h3>}
                        <button onClick={()=>deleteRecipe(recipie._id)}>Delete Recipie</button>
                    </li>
                    </blockquote>
                    )
                })}
            </ul>
        
        
    </div>
}
