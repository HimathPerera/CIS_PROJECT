import React, { useEffect, useState } from "react";

import Card from "../../../shared/components/UIElements/Card";
import ErrorModal from "../../../shared/components/errors/ErrorModal";
import LoadingSpinner from "../../../shared/components/loader/loader.component";
import "./admin.style.css";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState();

  useEffect(() => {
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

  if (values) {
    console.log(values.length);
    console.log(values);
  }
  return (
    <div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="admin-chart-container">
        {values ? (
          values.map((url) => (
            <Card key={url} className="admin-card">
              <img
                src={url}
                alt="no analytics found"
                width="600"
                height="300"
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
