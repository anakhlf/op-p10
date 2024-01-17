import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";


import "./style.scss";

const Slider = () => {
  
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus ? data.focus.sort((evtA, evtB) => new Date(evtA.date) < new Date(evtB.date) ? -1 : 1) : [];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0);
    }, 5000);

    return () => clearInterval(interval);
  }, [byDateDesc.length]); // Dépendance à la longueur de byDateDesc pour recalculer l'intervalle si le nombre d'événements change

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}> {/* Clé unique pour chaque élément de la liste */}
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={uuidv4()} // Clé unique pour chaque bouton radio
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

