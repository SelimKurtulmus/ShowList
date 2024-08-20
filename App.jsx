import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Switch, Route, Link} from 'react-router-dom';
import ShowDetails from './ShowDetails';

function App() {
  const [shows, setShows] = useState(null);
  const [select, setSelect] = useState(null);
  const [watch, setWatch] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/most-popular?page=1")
      .then((response) => {
        setShows(response.data.tv_shows);
        console.log(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('İşlem tamamlandı.'));
  }, []);

  function addWatch(show) {
    if (watch.filter((selected) => selected.id === show.id).length) {
      alert('This movie is selected');
    } else {
      const newList = [...watch, show];
    setWatch(newList);
    }
  }

  return (
    <Switch>
    <Route path='/' exact>
    <div className="app">
      <div className="list">
        <h2>API dizi listesi</h2>
        <div className='list-container'>
          {shows ? shows.map((show) => (
            <div key={show.id} className='list-item'> 
              <img src={show.image_thumbnail_path} alt={`${show.name} posteri`} />
              <div>
                <h3>{show.name}</h3>
                <button onClick={() => setSelect(show)}>Review</button>
                <button onClick={() => addWatch(show)} >Add</button>
              </div>
            </div>
          )) : <p>Loading...</p>}
        </div>
      </div>
      {select ? (
        <div className="info-box">
          <img src={select.image_thumbnail_path} alt={`${select.name} posteri`} />
          <div>
            <h1>{select.name}</h1>
            <p>
              {select.country} - {select.network} - {select.status}
            </p>
            <p>Start Date: {select.start_date}</p>
            <Link to={`/show-detail/${select.permalink}`} >Detail</Link>
            <button onClick={() => addWatch(select)} >Add</button>
          </div>
        </div> 
      ) : (
        <div className='info-box'>Please select a movie</div> 
      )}
      <div className="list">
        <h2>Watch List</h2>
        <div className='list-container'>
          {watch.length > 0
          ? watch.map((show) => (
            <div key={show.id} className='list-item'>
              <img src={show.image_thumbnail_path} alt={`${show.name} posteri`} />
              <div>
                <h3>{show.name}</h3>
                <button>Remove</button>
              </div>
            </div>
          ))
        : <p>Add to movie</p>}
        </div>
      </div>
    </div>
    </Route>
    <Route path='/show-detail/:show'>
        <ShowDetails addShow={addWatch}/>
    </Route>
    </Switch>
  );
}

export default App;
