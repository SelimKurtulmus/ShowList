import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function ShowDetails({ addShow }) {
  const [detail, setDetail] = useState(null);
  let { show } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/show-details?q=" + show)
      .then((response) => setDetail(response.data.tvShow))
      .catch((error) => console.log(error))
      .finally(() => console.log("İşlem tamamlandı."));
  }, [show]);

  function handleBack() {
    history.push("/");
  }

  function handleAdd() {
    addShow(detail);
    alert("Added!");
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }

  return (
    <div className="details-container">
      {detail ? (
        <div className="details details-content">
          <img src={detail.image_path} alt="Dizi poster" />
          <div className="details-table">
            <h1>
              {detail.name} - {Number(detail.rating).toFixed(2)}
            </h1>
            <h3>{detail.genres.join(" - ")}</h3>
            <p>{detail.description}</p>
            <div>
              <button onClick={handleAdd}>Listeme ekle</button>
              <button onClick={handleBack}>Geri Dön</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="details">Loading...</div>
      )}
    </div>
  );
}