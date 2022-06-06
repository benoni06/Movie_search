
import axios from "axios";
import { useState } from "react";
import { MovieList } from "./MovieList";
import list from './movieList.json';

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading,setisLoading] = useState(false);
  const [isError,setError]=useState(false);
 
  let details = JSON.parse(JSON.stringify(list));
  const fetchMovieInfo = () => {
    try {
		setisLoading =true;
      axios
        .get(`http://www.omdbapi.com/?apikey=d505ecf7&s=${movieName}`)
        .then((response) => {
          let result = JSON.parse(JSON.stringify(response));
		  if(result.data.Response==="False")
		     setError(true);
			 else
			 setError(false);
          const { data } = result;
          const { Search } = data;
          setMovieInfo(Search);
        });
    } catch (isError) {
      setError=true;
    }
  };

  return (
    <div className="centered">
      <div className="container-sm top-container">
        <h2>Movie Watch</h2>

        <input
        className="search"
          type="text"
          placeholder="Search for any movie..."
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button href="#" type="submit" onClick={fetchMovieInfo} disabled={movieName===""? true:false} >
          Search
        </button>
      </div>
	    {isLoading?<p>Loading</p>:null}
		{isError?<p>no Movies found</p>:null}
      <div>
        {movieInfo ?<MovieList details={movieInfo}/>:<MovieList details={details} />}
      </div>
      
    </div>
  );
}