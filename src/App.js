import { useState,useEffect } from "react";

function App(){
  let[movieList,updateMovie]=useState([]);
  let[search,updateSearch]=useState("");
  let[select,updateSelect]=useState("");
  

  //https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json
  const getinfo=async()=>{
    await fetch("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json")
    .then(response=>response.json())
    .then(array=>{
      updateMovie(array);
    })
  }

  let filteredArray=movieList.filter((element)=>{
    let titleName=element.title.toLowerCase().includes(search.toLowerCase());
    const genreName = select === "" || (element.genres && element.genres.includes(select));
    return titleName && genreName
  })

  useEffect(()=>{
    getinfo();
  },[]);

  return(
    <div className="container">
      <div className="row">
        <div className="row mt-3">
          <div className="col-xl-2"></div>
          <div className="col-xl-3"><input type="text" placeholder="Search" onChange={obj=>updateSearch(obj.target.value)} className="form-control"/></div>
          <div className="col-xl-2"></div>
          <div className="col-xl-3"><select className="form-select" onChange={obj=>updateSelect(obj.target.value)}>
                                      <option></option>
                                      <option>Comedy</option>
                                      <option>Short</option>
                                      <option>Silent</option>
                                      <option>Documentary</option>
                                    </select></div>
        </div>
        <div className="col-xl-12 mt-5">
          <table className="table">
            <thead>
              <tr className="size">
                <th>Title</th>
                <th>Year</th>
                <th>Cast</th>
                <th>Genres</th>
                <th>Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredArray.map((Movie,index)=>{
                  return(
                    <tr key={index} className="size">
                      <td>{Movie.title}</td>
                      <td>{Movie.year}</td>
                      <td>{Movie.cast.length>0 ? Movie.cast.join(","):"Cast not available"}</td>
                      <td>{Movie.genres.length>0?Movie.genres.join(","):"Genres not available"}</td>
                      <td><img src={Movie.href} alt="pic"/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App;