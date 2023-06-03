import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function QuickSearch() {
  let navigate = useNavigate(); //instance of it
  let [mealtypeList, setMealtypeList] = useState([]); //it always provide array

  let getMealtypes = async () => {
    try {
      let response = await axios.get(
        "https://zometo-api.onrender.com/api/get-meal-type"
      );
      let data = response.data;
      if (data.status === true) {
        setMealtypeList([...data.result]); //recreating array by using spread oprator (...)
      } else {
        setMealtypeList([]);
      }
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };

  let getQuickSearchPage = (id) => {
    navigate("/search-page/" + id);
  };
  useEffect(() => {
    getMealtypes();
  }, []);

  return (
    <section className="row container second-section">
      {mealtypeList.map((mealtype, index) => {
        return (
          <div
            className="col-lg-4 col-md-6 col-10  container"
            key={index}
            onClick={() => getQuickSearchPage(mealtype.meal_type)}
          >
            <div>
              <div className="cards mt-4">
                <img
                  src={"/img/" + mealtype.image}
                  alt={`./${mealtype.image}`}
                />
                <div className="cards-body">
                  <p className="cards-title">{mealtype.name}</p>
                  <p className="cards-text">{mealtype.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
export default QuickSearch;
