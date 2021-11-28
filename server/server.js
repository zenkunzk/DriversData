require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/jwtAuth"))

app.use("/dashboard", require("./routes/dashboard"))

app.use(express.json({ limit: '10kb' }));

app.get("/api/v14/data", async (req, res) => {
  try {
    const results = await db.query("select * from clientapis order by id asc");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        clientapis: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/v13/data", async (req, res) => {
  try {
    const results = await db.query("select * from paymentrecords order by id asc");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        paymentrecords: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v11/data", async (req, res) => {
  try {
    const results = await db.query("select * from calendars order by id asc");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        calendars: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v12/data", async (req, res) => {
  try {
    const results = await db.query("select * from accountings order by id asc");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        accountings: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v3/data", async (req, res) => {
  try {
    const results = await db.query("select * from driversdataemails order by id asc");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        driversdataemails: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v4/data", async (req, res) => {
  try {
    const results = await db.query("select * from driversinfos order by id asc");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        driversinfos: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v5/data", async (req, res) => {
  try {
    const results = await db.query("select * from users");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        users: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v14/data/:id", async (req, res) => {
  console.log(req.params.id);

  try {

    const results = await db.query("select * from clientapis where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        clientapi: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v13/data/:id", async (req, res) => {
  console.log(req.params.id);

  try {

    const results = await db.query("select * from paymentrecords where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        paymentrecord: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v12/data/:id", async (req, res) => {
  console.log(req.params.id);

  try {

    const results = await db.query("select * from accountings where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        accounting: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v11/data/:id", async (req, res) => {
  console.log(req.params.id);

  try {

    const results = await db.query("select * from calendars where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        calendar: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v3/data/:id", async (req, res) => {
  console.log(req.params.id);

  try {

    const results = await db.query("select * from driversdataemails where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        driversdataemail: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v4/data/:id", async (req, res) => {
  console.log(req.params.id);

  try {

    const results = await db.query("select * from driversinfos where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        driversinfo: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v14/data", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO clientapis (email, apikey, company, apitype) values ($1, $2, $3, $4) returning *",
      [req.body.email, req.body.apikey, req.body.company, req.body.apitype]
    );
    res.status(201).json({
      status: "succes",
      data: {
        clientapi: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v13/data", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO paymentrecords (dateset, firstname, lastname, payments) values ($1, $2, $3, $4) returning *",
      [req.body.dateset, req.body.firstname, req.body.lastname, req.body.payments]
    );
    res.status(201).json({
      status: "succes",
      data: {
        paymentrecord: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v12/data", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO accountings (datecreated, firstname, lastname, address, phonenumber, driverlicense, loanamount, balance, payments, interests, total) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *",
      [req.body.datecreated, req.body.firstname, req.body.lastname, req.body.address, req.body.phonenumber, req.body.driverlicense, req.body.loanamount, req.body.balance, req.body.payments, req.body.interests, req.body.total]
    );
    res.status(201).json({
      status: "succes",
      data: {
        accounting: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v11/data", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO calendars (daynumber, email, api, startdate, enddate, type, current, date, companycolor, inuse, inusetwo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *",
      [req.body.daynumber, req.body.email, req.body.api, req.body.startdate, req.body.enddate, req.body.type, req.body.current, req.body.date, req.body.companycolor, req.body.inuse, req.body.inusetwo]
    );
    res.status(201).json({
      status: "succes",
      data: {
        calendar: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v3/data", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO driversdataemails (aemail, hereapis, mapboxapis, tomtomapis) values ($1, $2, $3, $4) returning *",
      [req.body.aemail, req.body.hereapis, req.body.mapboxapis, req.body.tomtomapis]
    );
    res.status(201).json({
      status: "succes",
      data: {
        driversdataemail: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v4/data", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO driversinfos (firstname, lastname, address, emails, cszc, phonenumber, companyname, creditcardpayment, expirationdate, code, price, checkingaccount, route, signature, note, dated) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *",
      [req.body.firstname, req.body.lastname, req.body.address, req.body.emails, req.body.cszc, req.body.phonenumber, req.body.companyname, req.body.creditcardpayment, req.body.expirationdate, req.body.code, req.body.price, req.body.checkingaccount, req.body.route, req.body.signature, req.body.note, req.body.dated]
    );
    res.status(201).json({
      status: "succes",
      data: {
        driversinfo: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/v14/data/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE clientapis SET email = $1, apikey = $2, company = $3, apitype = $4 where id = $5 returning *",
      [req.body.email, req.body.apikey, req.body.company, req.body.apitype, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        clientapi: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

app.put("/api/v12/data/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE accountings SET datecreated = $1, firstname = $2, lastname = $3, address = $4, phonenumber = $5, driverlicense = $6, loanamount = $7, balance = $8, payments = $9, interests = $10, total = $11 where id = $12 returning *",
      [req.body.datecreated, req.body.firstname, req.body.lastname, req.body.address, req.body.phonenumber, req.body.driverlicense, req.body.loanamount, req.body.balance, req.body.payments, req.body.interests, req.body.total, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        accounting: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

app.put("/api/v11/data/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE calendars SET daynumber = $1, email = $2, api = $3, startdate = $4, enddate = $5, type = $6, current = $7, date = $8, companycolor = $9, inuse = $10, inusetwo = $11 where id = $12 returning *",
      [req.body.daynumber, req.body.email, req.body.api, req.body.startdate, req.body.enddate, req.body.type, req.body.current, req.body.date, req.body.companycolor, req.body.inuse, req.body.inusetwo, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        calendar: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

app.put("/api/v3/data/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE driversdataemails SET aemail = $1, hereapis = $2, mapboxapis = $3, tomtomapis = $4 where id = $5 returning *",
      [req.body.aemail, req.body.hereapis, req.body.mapboxapis, req.body.tomtomapis, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        driversdataemail: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

app.put("/api/v4/data/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE driversinfos SET firstname = $1, lastname = $2, address = $3, emails = $4, cszc = $5, phonenumber = $6, companyname = $7, creditcardpayment = $8, expirationdate = $9, code = $10, price = $11, checkingaccount = $12, route = $13, signature = $14, note = $15, dated = $16 where id = $17 returning *",
      [req.body.firstname, req.body.lastname, req.body.address, req.body.emails, req.body.cszc, req.body.phonenumber, req.body.companyname, req.body.creditcardpayment, req.body.expirationdate, req.body.code, req.body.price, req.body.checkingaccount, req.body.route, req.body.signature, req.body.note, req.body.dated, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        driversinfo: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

app.delete("/api/v14/data/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM clientapis where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v11/data/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM calendars where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});
app.delete("/api/v12/data/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM accountings where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v3/data/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM driversdataemails where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v4/data/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM driversinfos where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v13/data/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM paymentrecords where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
