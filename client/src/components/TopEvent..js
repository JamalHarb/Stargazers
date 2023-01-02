// import React from 'react';
// import {Link} from '@reach/router';
// import moment from 'moment'

// const TopEvent = (props) => {
//   return (
//     <div>
//       <div>
//         <h3>Top 3 Competitions</h3>
//       {
//         props.topContests.map((contest,idx)=>
//         <div key={idx}  style={{border:"1px solid black", marginTop:"10px", padding:"10px"}}>
           
//            <div> <Link to={"/choose/" +contest._id} >{contest.question}</Link> </div>

//            <p> {moment().startOf(contest.createdAt).fromNow()}</p>
//            <p>{contest. createdAt}</p>
        
//         <p>{contest.country1} : {contest.vote1}</p>
//         <p>{contest.country2} : {contest.vote2}</p>
//       {contest.country3?<p>{contest.country3}  :{contest.vote3}</p>:""}
      
//         </div>
//         )
//       }

//     </div>
//     </div>
//   )
// }

// export default TopEvent