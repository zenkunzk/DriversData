import React, { useState, createContext } from "react";

export const DriversContext = createContext();

export const DriversContextProvider = (props) => {
  const [fivestardrivers, setFivestardrivers] = useState([]);
  const [fivestarestoreitems, setFivestarestoreitems] = useState([]);
  const [fivestarclientapis, setFivestarclientapis] = useState([]);

  const [ecuamericadrivers, setEcuamericadrivers] = useState([]);
  const [ecuamericarestoreitems, setEcuamericarestoreitems] = useState([]);
  const [ecuamericaclientapis, setEcuamericaclientapis] = useState([]);

  const [driversdataemails, setDriversdataemails] = useState([]);

  const [accountings, setAccountings] = useState([]);

  const [clientapis, setClientapis] = useState([]);

  const [driversinfos, setDriversinfos] = useState([]);
  const [driversinfosrestoreitems, setDriversinfosrestoreitems] = useState([]);

  const [users, setUsers] = useState([]);

  const [calendars, setCalendars] = useState([]);

  const [paymentrecords, setPaymentrecords] = useState([]);

  const addAccountings = (accounting) => {setAccountings([...accountings, accounting]);};

  const addClientapis = (clientapi) => {setClientapis([...clientapis, clientapi]);};

  const addPaymentrecords = (paymentrecord) => {setPaymentrecords([...paymentrecords, paymentrecord]);};

  const addDriversDataEmails = (driversdataemail) => {setEcuamericadrivers([...driversdataemails, driversdataemail]);};

  const addDriversinfos = (driversinfo) => {setDriversinfos([...driversinfos, driversinfo]);};
  const addDriversinfosrestoreitems = (driversinfosrestoreitem) => {setDriversinfosrestoreitems([...driversinfosrestoreitems, driversinfosrestoreitem]);};

  const addUsers = (user) => {setUsers([...users, user]);};

  const addCalendars = (calendar) => {setCalendars([...calendars, calendar]);};

  const addFivestarDrivers = (fivestardriver) => {setFivestardrivers([...fivestardrivers, fivestardriver]);};
  const addFivestaritems = (fivestarestoreitem) => {setFivestarestoreitems([...fivestarestoreitems, fivestarestoreitem]);};
  const addFivestarclientapis = (fivestarclientapi) => {setFivestarclientapis([...fivestarclientapis, fivestarclientapi]);};

  const addEcuamericaDrivers = (ecuamericadriver) => {setEcuamericadrivers([...ecuamericadrivers, ecuamericadriver]);};
  const addEcuamericaItems = (ecuamericarestoreitem) => {setEcuamericarestoreitems([...ecuamericarestoreitems, ecuamericarestoreitem]);};
  const addEcuamericaclientapis = (ecuamericaclientapi) => {setEcuamericaclientapis([...ecuamericaclientapis, ecuamericaclientapi]);};

  return (
    <DriversContext.Provider
      value={{
        fivestardrivers,
        fivestarestoreitems,
        fivestarclientapis,
        ecuamericadrivers,
        ecuamericarestoreitems,
        driversdataemails,
        driversinfos,
        accountings,
        users,
        clientapis,
        calendars,
        paymentrecords,
        setFivestardrivers,
        setClientapis,
        setFivestarestoreitems,
        setFivestarclientapis,
        setEcuamericadrivers,
        setEcuamericarestoreitems,
        setDriversdataemails,
        setDriversinfos,
        setUsers,
        setPaymentrecords,
        setCalendars,
        addFivestarDrivers,
        addEcuamericaDrivers,
        addDriversDataEmails,
        addPaymentrecords,
        addDriversinfos,
        addUsers,
        addCalendars,
        addFivestaritems,
        addFivestarclientapis,
        addEcuamericaItems,
        addClientapis,
        addAccountings,
        ecuamericaclientapis,
        setEcuamericaclientapis,
        addEcuamericaclientapis,
        driversinfosrestoreitems,
        setDriversinfosrestoreitems,
        setAccountings,
        addDriversinfosrestoreitems
      }}
    >
      {props.children}
    </DriversContext.Provider>
  );
};
