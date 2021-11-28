import React, { useState, createContext } from "react";

export const DriversContext = createContext();

export const DriversContextProvider = (props) => {
  const [driversdataemails, setDriversdataemails] = useState([]);

  const [accountings, setAccountings] = useState([]);

  const [clientapis, setClientapis] = useState([]);

  const [driversinfos, setDriversinfos] = useState([]);

  const [users, setUsers] = useState([]);

  const [calendars, setCalendars] = useState([]);

  const [paymentrecords, setPaymentrecords] = useState([]);

  const addAccountings = (accounting) => {setAccountings([...accountings, accounting]);};

  const addClientapis = (clientapi) => {setClientapis([...clientapis, clientapi]);};

  const addPaymentrecords = (paymentrecord) => {setPaymentrecords([...paymentrecords, paymentrecord]);};

  const addDriversDataEmails = (driversdataemail) => {setDriversdataemails([...driversdataemails, driversdataemail]);};

  const addDriversinfos = (driversinfo) => {setDriversinfos([...driversinfos, driversinfo]);};

  const addUsers = (user) => {setUsers([...users, user]);};

  const addCalendars = (calendar) => {setCalendars([...calendars, calendar]);};

  return (
    <DriversContext.Provider
      value={{
        driversdataemails,
        driversinfos,
        accountings,
        users,
        clientapis,
        calendars,
        paymentrecords,
        setClientapis,
        setDriversdataemails,
        setDriversinfos,
        setUsers,
        setPaymentrecords,
        setCalendars,
        addDriversDataEmails,
        addPaymentrecords,
        addDriversinfos,
        addUsers,
        addCalendars,
        addClientapis,
        addAccountings,
        setAccountings
      }}
    >
      {props.children}
    </DriversContext.Provider>
  );
};
