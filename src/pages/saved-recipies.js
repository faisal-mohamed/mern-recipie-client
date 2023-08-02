import { useEffect, useState } from 'react';
import Axios from 'axios';
import {userOwner} from '../custom-hooks/userOwner.js';
import { useCookies } from 'react-cookie';

export const SavedRecipies = () => {
    const [savedRecipies, setSavedRecipies] = useState([]);
    const userID = userOwner();
    const [cookies, _] = useCookies(["access_token"]);

    useEffect(() => {
        const fetchSavedRecipies = async () => {
            try {
                const response =  await Axios.get(`http://localhost:5000/recipie/saved-recipies/${userID}`,{headers: {authorization: cookies.access_token }});
                setSavedRecipies(response.data.savedRecipies);
            } catch (error) {
                console.log(error);
            }

        };

        fetchSavedRecipies();
    }, [])

    return <div>

    <h1 className='h1__recipie'>Recipies</h1>
    
        <ul>
            {savedRecipies.map((recipie) => {
                return (
                    <blockquote>
                <li key={recipie._id} className='li__recipiehome'>
                 
                    <div>
                        <h2 className='h2__recipiehome'>{recipie.name}</h2>
                    </div>
                       
                    
                    <img src={recipie.imageURL} alt={recipie.name} className='img__recipiehome' />
                   <br></br><br></br>
                    <div className='p'>
                        {recipie.instruction}
                    </div>
                    
                    <div className='time__recipiehome'>
                       <h3>Duration: {recipie.time} minutes</h3>
                    </div>
                    
                </li>
                </blockquote>
                )
            })}
        </ul>
    
    
</div>
}