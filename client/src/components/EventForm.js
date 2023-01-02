import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {

    const [name, setName] = useState(""); 
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [space, setSpace] = useState("");
    const [purpose, setPurpose] = useState("");
    const [errors, setErrors] = useState([]);
    const[loggedUser, setLoggedUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/logged', {withCredentials: true})
            .then(res => {
                console.log(res);
                setLoggedUser(res.data.user);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    }, [navigate]);


    const onSubmitHandler = e => {
        
        e.preventDefault();
       
        axios.post('http://localhost:8000/api/events', {
            name,
            location,
            capacity,
            space,
            purpose,
            user_id:loggedUser._id
        })
            .then(res=>{console.log(res); navigate("/explore")})
            .catch(err=>{
                const errorResponse = err.response.data.errors; 
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
              
                setErrors(errorArr);
            })   
    }
return (
    <div>
    <form onSubmit={onSubmitHandler}  style={{marginLeft:"39%", marginTop:"3%"}}>
    {errors.map((err, index) => <p key={index}>{err}</p>)}


            <p>
                <label>Event Name</label><br/>
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
            </p>

            <p>
                <label>Location</label><br/>
                <input type="text" onChange={(e)=>setLocation(e.target.value)} value={location}/>
            </p>

            <p>
                <label>Capacity</label><br/>
                <input type="number" onChange={(e)=>setCapacity(e.target.value)} value={capacity}/>
            </p>

            <p>
                <label>Astronomy phenomenon</label><br/>
                <input type="text" onChange={(e)=>setSpace(e.target.value)} value={space}/>
            </p>

            <p>
<label for="purpose">Event purpose:</label>
    <select name="purpose" id="purpose" onChange={(e) => setPurpose(e.target.value)} value={purpose}>
    <option value="research">Research</option>
    <option value="education">Education</option>
<option value="fun">Fun</option>
                                
</select>
                            </p>

                         
        
            <input type="submit"/>
        </form>
    </div>
)
}

export default EventForm
