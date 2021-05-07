import React, { useEffect, useState } from "react";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Card from "../../../shared/components/UIElements/Card";
import ErrorModal from "../../../shared/components/errors/ErrorModal";
import LoadingSpinner from "../../../shared/components/loader/loader.component";
import "./admin.style.css";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState();
  const [raffelWinner, setRaffelWinner] = useState([]);

  let months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    ///reciving data for admin analytics
    const getValues = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/admin/anyatics/frequency"
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setValues(responseData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    getValues();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const selectWinnerHandler = async (e) => {
    setIsLoading(true);
    let monthIndex = months.indexOf(e.value);
    try {
      const response = await fetch(
        "http://localhost:5000/monthly/winner/find",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: monthIndex,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
        throw new Error(responseData.message);
      }
      setRaffelWinner([responseData]);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {
        <div className="winners">
          <Dropdown
            options={months}
            value="select the month"
            placeholder="Select an option"
            onChange={selectWinnerHandler}
          />

          <div className="winner-container">
            {
              // eslint-disable-next-line
              !raffelWinner.length == 0 ? (
                raffelWinner.map((data) => {
                  return (
                    <Card
                      key={data.winnerObj._id}
                      className="admin-card card_1"
                    >
                      {data.winnerObj.winner}
                    </Card>
                  );
                })
              ) : (
                <Card className="admin-card card_2">please select a month</Card>
              )
            }
          </div>
        </div>
      }

      <div className="admin-chart-container">
        {values ? (
          values.map((url) => (
            <Card key={url} className="admin-card">
              <img
                className="admin-chart"
                src={url}
                alt="no analytics found"
              ></img>
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
