import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import CreateTable from "./components/CreateTable";
import Home from "./components/Home";

const App = () => {
  const [RowNo, setRowNo] = useState(0);
  const [ColNo, setColNo] = useState(0);
  const [dep, setDepName] = useState("")
  const [month, setMonthName] = useState("")
  const [year, setYearName] = useState("")
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={() => <Home setRowNo={setRowNo} setMonthName={setMonthName} setDepName={setDepName} setYearName={setYearName} setColNo={setColNo}/>} />
        {RowNo > 0 && (
          <Route
            path="/createTable"
            component={() => <CreateTable RowNo={RowNo} dep={dep} month={month} ColNo={ColNo} year={year}/>}
          />
        )}
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
