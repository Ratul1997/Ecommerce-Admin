/*eslint-disable */
import React, { useState, useEffect } from "react";
import { Star } from "react-feather";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";

import classnames from "classnames";
export default function Ratings() {
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    //  console.log(axiosInstance().get())
    try {
      const res = await axiosInstance().get(urls.GET_RATINGS);
      setRatings(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h6 className="filter-title">Ratings</h6>
      {ratings &&
        ratings.map(item => {
          return (
            <div key={item.ratings} className="ratings-list">
              <a href="/" onClick={e => e.preventDefault()}>
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item mr-25">
                        <Star
                          className={classnames({
                            "filled-star": index + 1 <= item.ratings,
                            "unfilled-star": index + 1 > item.ratings,
                          })}
                        />
                      </li>
                    );
                  })}
                  <li>& up</li>
                </ul>
              </a>
              <div className="stars-received">{item.count}</div>
            </div>
          );
        })}
    </>
  );
}
