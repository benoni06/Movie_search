import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";


const Post =() =>{
    const router = useRouter();
    const {MOVIEID}= router.query;
    const [Movies,setMovies] = useState("");
    useEffect(() =>{axios.get(`http://www.omdbapi.com/?apikey=d505ecf7&i=${MOVIEID}`).then((Response)=>{
        const result=JSON.parse(JSON.stringify(Response))
        let {data} =result;
        setMovies(data);
    });
    },[])

if(!setMovies)
   return null;
return(
   <div id="centered">
   <span className="Container">
   <img className="photo"src= {Movies.Poster} alt={Movies.Title} width="300px" height="300px" />
   </span>
   <div>
    <h2>{Movies.Year}</h2>
    <h2>{Movies.Released}</h2>
    <h2>{Movies.Director}</h2>
    <p>{Movies.Plot}</p>
    </div>
    </div>
 )}
export default Post;