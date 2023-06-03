import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function RestaurentPage() {
  let [tab, setTab] = useState(1);
  let { id } = useParams();
  let defaultValue = {
    _id: -1,
    name: "",
    city: "",
    location_id: -1,
    city_id: -1,
    locality: "",
    thumb: [],
    aggregate_rating: 0,
    rating_text: "",
    min_price: 0,
    contact_number: 0,
    cuisine_id: [],
    cuisine: [],
    image: "search-item.png",
    mealtype_id: -1,
  };

  let [restaurant, setRestaurant] = useState({ ...defaultValue });
  let [menuItems, setMenuItems] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  let getRestaurantDetails = async () => {
    try {
      let URL =
        "https://zometo-api.onrender.com/api/get-restaurant-detail-by-id/" + id;
      let { data } = await axios.get(URL);

      if (data.status === true) {
        setRestaurant({ ...data.result });
      } else {
        setRestaurant({ ...defaultValue });
      }
    } catch (error) {
      console.log(error);
    }
  };
  let getMenuItems = async () => {
    let Url =
      "https://zometo-api.onrender.com/api/get-menu-item-list-by-restaurant-id/" +
      id;
    let { data } = await axios.get(Url);
    if (data.status === true) {
      setMenuItems([...data.result]);
    } else {
      setMenuItems([]);
    }
  };
  let addItemQuantity = (index) => {
    let _menuItems = [...menuItems];
    _menuItems[index].qty += 1;

    let _price = Number(menuItems[index].price);
    setTotalPrice(totalPrice + _price); //updating total price state
    setMenuItems(_menuItems); //updating menu item state
  };
  let removeItemQuantity = (index) => {
    let _menuItems = [...menuItems];
    _menuItems[index].qty -= 1;

    let _price = Number(menuItems[index].price);
    setTotalPrice(totalPrice - _price); //updating total price state
    setMenuItems(_menuItems); //updating menu item state
  };

  useEffect(() => {
    getRestaurantDetails();
  }, []);
  return (
    <>
      <Header color="heading" />

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg " style={{ height: "75vh" }}>
          <div className="modal-content">
            <div className="modal-body h-75">
              <Carousel showThumbs={false} infiniteLoop={true}>
                {restaurant.thumb.map((value, index) => {
                  return (
                    <div key={index} className="w-100">
                      <img src={"/img/" + value} alt="" srcset="" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                {restaurant.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0 ">
              {menuItems.map((menu_item, index) => {
                return (
                  <div className="row  m-0 mt-3 " key={index}>
                    <div className="col-9 p-0 ">
                      <i className="fa-solid fa-leaf mb-0"></i>
                      <p className="mb-0 h6">{menu_item.name}</p>
                      <p className="mb-0">@{menu_item.price}</p>
                      <p className="small text-muted">
                        {menu_item.description}
                      </p>
                    </div>
                    <div className="col-3 justify-content-end">
                      <div className="menu-food-item position-relative">
                        <img src={"/img/" + menu_item.image} alt="" />
                        {menu_item.qty === 0 ? (
                          <button
                            className="btn btn-primary btn-sm add"
                            onClick={() => addItemQuantity(index)}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="order-item-count section">
                            <span
                              className="hand"
                              onClick={() => removeItemQuantity(index)}
                            >
                              -
                            </span>
                            <span>{menu_item.qty}</span>
                            <span
                              className="hand"
                              onClick={() => addItemQuantity(index)}
                            >
                              +
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            {totalPrice > 0 ? (
              <div className="modal-footer d-flex justify-content-between">
                <p className="h4">Subtotal {totalPrice}</p>
                <button
                  className="btn btn-danger"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Pay Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section>
        <div className="row justify-content-center">
          <div className="col-10 mt-lg-5 mt-1 restaurant-menuitem-image position-relative">
            <img src={"/img/" + restaurant.image} alt="" />
            <button
              className="btn btn-light d-lg-flex d-none"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Click to see Image Gallery
            </button>
          </div>
          <div className="col-10">
            <p className="main-para">{restaurant.name}</p>

            <div className="restaurant-menu-details  mb-2">
              <div className="restaurant-left-menu d-flex justify-content-between align-items-start">
                <ul className="list-unstyled d-flex gap-3 fw-bold">
                  <li className="pb-2 hand" onClick={() => setTab(1)}>
                    Overview
                  </li>
                  <li className="pb-2 hand" onClick={() => setTab(2)}>
                    Contact
                  </li>
                </ul>

                <button
                  className="btn"
                  onClick={getMenuItems}
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                >
                  Place Online Order
                </button>
              </div>
              <hr />
              {tab === 1 ? (
                <div className="restaurant-overview">
                  <p className="restaurant-overview-heading">
                    About this place
                  </p>

                  <p className=" restaurant-overview-subtitle m-0">Cuisine</p>
                  <p className="text-muted">
                    {restaurant.cuisine.length > 0
                      ? restaurant.cuisine.reduce((prevValue, CurrentValue) => {
                          return prevValue.name + ", " + CurrentValue.name;
                        })
                      : null}
                  </p>

                  <p className=" restaurant-overview-subtitle m-0">
                    Average Cost
                  </p>
                  <p className="text-muted">
                    ₹{restaurant.min_price} for two people (approx.)
                  </p>
                </div>
              ) : (
                <div className="restaurant-overview contact">
                  <p className="restaurant-overview-heading">
                    About this place
                  </p>

                  <p className=" restaurant-overview-subtitle m-0">
                    Phone Number
                  </p>
                  <p className="text-danger">+{restaurant.contact_number}</p>

                  <p className=" restaurant-overview-subtitle m-0">
                    {restaurant.name}
                  </p>
                  <p className="text-muted">
                    {restaurant.locality}, {restaurant.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RestaurentPage;
