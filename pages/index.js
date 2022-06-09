import axios from "axios";
import { Router } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { MovieList } from "./MovieList";
import list from "./movieList.json";

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [Info, setInfo] = useState([]);
  const fetchMovieInfo = async (e) => {
      setisLoading = true;
      const data = await axios.get(
        `http://localhost:3000//searchMovie/${movieName}`,
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(data.data);
      setMovieInfo([data.data])
    
      //   .then((response) => {
      //     let result = JSON.parse(JSON.stringify(response));
      // if(result.data.Response==="False")
      //    setError(true);
      //  else
      //  setError(false);
      //     const { data } = result;
      //     const { Search } = data;
      //     setMovieInfo(Search);
      //   });
    // } catch (isError) {
    //   setError = true;
    // }
  }
  //   const fetchInfo = () => {
  //     try {
  // 		setisLoading =true;
  //       axios
  //         .get(`http://localhost:3000/movie/all`,{
  //           headers:{
  //             'Content-type':'application/json','Access-Control-Allow-Origin':'*'
  //           }
  //         })
  //         .then((response) => {
  //           let result = JSON.parse(JSON.stringify(response));
  // 		      let {data}=result
  //           console.log(data);
  //           setInfo(data);
  //   });
  // }
  //      catch(err)
  //      {console.log(err);
  //     }
  //   }
// const openInfo =(MovieId)=> { Router.push('/${MovieId}')}

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
        <button
          href="#"
          type="submit"
          onClick={fetchMovieInfo}
          disabled={movieName === "" ? true : false}
        >
          Search
        </button>
      </div>
      {isLoading ? <p>Loading</p> : null}
      {isError ? <p>no Movies found</p> : null}
      <div>
        {movieInfo ? (
          <MovieList details={movieInfo} />
        ) : (
          <MovieList details={Info} />
        )}
      </div>
    </div>
  );
}
