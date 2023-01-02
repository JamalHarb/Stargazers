import React from 'react'

const UserProfile = (props) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [myevents, setMyEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/logged', { withCredentials: true })
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

useEffect(()=>{
  axios.get('http://localhost:8000/api/events/user/' + props.id)
      .then(res=>{
          setMyEvents(res.data);
          setLoaded(true);
      })
      .catch(err => console.error(err));
},[]);



  return (
    <div>
    <h1>Welcome {loggedUser.firstName}</h1>
    <button onClick={logout}>Logout</button>
    <button onClick={() => navigate('/events/create')}>Create an Event</button>

    {
        myevents.map((event,idx)=>
        <div key={idx} style={{border:"1px solid black", marginTop:"10px", padding:"10px"}}>
        
        
      <p> {event.createdAt}</p>
     
        <p>{event.name}</p>
        <p>{event.location} </p>
        <p>{event.space} </p>
        {/* <p>{event.user_id.name} </p> */}

       
        </div>
        )
      }
</div>
  )
}

export default UserProfile
