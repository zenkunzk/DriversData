    fmapboxk VARCHAR(1000),
    fmapboxksec VARCHAR(1000),
    ftomtomk VARCHAR(1000),
    ftomtomksec VARCHAR(1000),
    fherek VARCHAR(1000),
    fhereksec VARCHAR(1000),
    fherekthi VARCHAR(1000),
    fherekfou VARCHAR(1000),
    emapboxk VARCHAR(1000),
    emapboxksec VARCHAR(1000),
    etomtomk VARCHAR(1000),
    etomtomksec VARCHAR(1000),
    eherek VARCHAR(1000),
    ehereksec VARCHAR(1000),
    eherekthi VARCHAR(1000),
    eherekfou VARCHAR(1000),
    amapboxk VARCHAR(1000),
    amapboxksec VARCHAR(1000),
    atomtomk VARCHAR(1000),
    atomtomksec VARCHAR(1000),
    aherek VARCHAR(1000),
    ahereksec VARCHAR(1000),
    aherekthi VARCHAR(1000),
    aherekfou VARCHAR(1000),
    rmapboxk VARCHAR(1000),
    rmapboxksec VARCHAR(1000),
    rtomtomk VARCHAR(1000),
    rtomtomksec VARCHAR(1000),
    rherek VARCHAR(1000),
    rhereksec VARCHAR(1000),
    rherekthi VARCHAR(1000),
    rherekfou VARCHAR(1000)

CREATE TABLE ecuamericadrivers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(1000),
    username VARCHAR(1000),
    mapboxn VARCHAR(1000),
    mapboxk VARCHAR(1000),
    mapboxnsec VARCHAR(1000),
    mapboxksec VARCHAR(1000),
    tomtomn VARCHAR(1000),
    tomtomk VARCHAR(1000),
    tomtomnsec VARCHAR(1000),
    tomtomksec VARCHAR(1000),
    heren VARCHAR(1000),
    herek VARCHAR(1000),
    herensec VARCHAR(1000),
    hereksec VARCHAR(1000),
    herenthi VARCHAR(1000),
    herekthi VARCHAR(1000),
    herenfou VARCHAR(1000),
    herekfou VARCHAR(1000)
);

CREATE TABLE fivestardrivers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(1000),
    username VARCHAR(1000),
    mapboxn VARCHAR(1000),
    mapboxk VARCHAR(1000),
    mapboxnsec VARCHAR(1000),
    mapboxksec VARCHAR(1000),
    tomtomn VARCHAR(1000),
    tomtomk VARCHAR(1000),
    tomtomnsec VARCHAR(1000),
    tomtomksec VARCHAR(1000),
    heren VARCHAR(1000),
    herek VARCHAR(1000),
    herensec VARCHAR(1000),
    hereksec VARCHAR(1000),
    herenthi VARCHAR(1000),
    herekthi VARCHAR(1000),
    herenfou VARCHAR(1000),
    herekfou VARCHAR(1000)
);

CREATE TABLE calendars (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    daynumber VARCHAR(1000),
    email VARCHAR(1000),
    api VARCHAR(1000),
    startdate VARCHAR(1000),
    enddate VARCHAR(1000)
);

CREATE TABLE driversdataemails (
id BIGSERIAL NOT NULL PRIMARY KEY,
    femail VARCHAR(1000),
    fstatus VARCHAR(1000),
    eemail VARCHAR(1000),
    estatus VARCHAR(1000),
    aemail VARCHAR(1000),
    astatus VARCHAR(1000),
    remail VARCHAR(1000),
    rstatus VARCHAR(1000)
);

ALTER TABLE driversdataemails ADD COLUMN (
    fmapboxk VARCHAR(1000),
    fmapboxksec VARCHAR(1000),
    ftomtomk VARCHAR(1000),
    ftomtomksec VARCHAR(1000),
    fherek VARCHAR(1000),
    fhereksec VARCHAR(1000),
    fherekthi VARCHAR(1000),
    fherekfou VARCHAR(1000),
    emapboxk VARCHAR(1000),
    emapboxksec VARCHAR(1000),
    etomtomk VARCHAR(1000),
    etomtomksec VARCHAR(1000),
    eherek VARCHAR(1000),
    ehereksec VARCHAR(1000),
    eherekthi VARCHAR(1000),
    eherekfou VARCHAR(1000),
    amapboxk VARCHAR(1000),
    amapboxksec VARCHAR(1000),
    atomtomk VARCHAR(1000),
    atomtomksec VARCHAR(1000),
    aherek VARCHAR(1000),
    ahereksec VARCHAR(1000),
    aherekthi VARCHAR(1000),
    aherekfou VARCHAR(1000),
    rmapboxk VARCHAR(1000),
    rmapboxksec VARCHAR(1000),
    rtomtomk VARCHAR(1000),
    rtomtomksec VARCHAR(1000),
    rherek VARCHAR(1000),
    rhereksec VARCHAR(1000),
    rherekthi VARCHAR(1000),
    rherekfou VARCHAR(1000)
);

CREATE TABLE driversinfosrestoreitems (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(1000),
    lastname VARCHAR(1000),
    address VARCHAR(1000),
    emails VARCHAR(1000),
    cszc VARCHAR(1000),
    phonenumber VARCHAR(1000),
    companyname VARCHAR(1000),
    creditcardpayment VARCHAR(1000),
    expirationdate VARCHAR(1000),
    code VARCHAR(1000),
    price VARCHAR(1000),
    checkingaccount VARCHAR(1000),
    route VARCHAR(1000),
    signature VARCHAR(1000),
    dated VARCHAR(1000),
    note VARCHAR(1000)
);

CREATE TABLE fivestarestoreitems (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(1000),
    username VARCHAR(1000),
    mapboxn VARCHAR(1000),
    mapboxk VARCHAR(1000),
    mapboxnsec VARCHAR(1000),
    mapboxksec VARCHAR(1000),
    tomtomn VARCHAR(1000),
    tomtomk VARCHAR(1000),
    tomtomnsec VARCHAR(1000),
    tomtomksec VARCHAR(1000),
    heren VARCHAR(1000),
    herek VARCHAR(1000),
    herensec VARCHAR(1000),
    hereksec VARCHAR(1000),
    herenthi VARCHAR(1000),
    herekthi VARCHAR(1000),
    herenfou VARCHAR(1000),
    herekfou VARCHAR(1000)
);

CREATE TABLE ecuamericarestoreitems (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(1000),
    username VARCHAR(1000),
    mapboxn VARCHAR(1000),
    mapboxk VARCHAR(1000),
    mapboxnsec VARCHAR(1000),
    mapboxksec VARCHAR(1000),
    tomtomn VARCHAR(1000),
    tomtomk VARCHAR(1000),
    tomtomnsec VARCHAR(1000),
    tomtomksec VARCHAR(1000),
    heren VARCHAR(1000),
    herek VARCHAR(1000),
    herensec VARCHAR(1000),
    hereksec VARCHAR(1000),
    herenthi VARCHAR(1000),
    herekthi VARCHAR(1000),
    herenfou VARCHAR(1000),
    herekfou VARCHAR(1000)
);

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE fivestarclientapis (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(255),
    clientapikey VARCHAR(1000),
    createddate VARCHAR(100),
    expdate VARCHAR(100),
);

CREATE TABLE ecuamericaclientapis (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(255),
    clientapikey VARCHAR(1000),
    createddate VARCHAR(100),
    expdate VARCHAR(100)
);

CREATE TABLE accountings (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    datecreated VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    address VARCHAR(255),
    phonenumber VARCHAR(255),
    driverlicense VARCHAR(255),
    loanamount VARCHAR(255),
    balance VARCHAR(255),
    payments VARCHAR(255),
    interests VARCHAR(255),
    total VARCHAR(255)
);

CREATE TABLE paymentrecords (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    dateset VARCHAR(255),
    firstnametwo VARCHAR(255),
    lastnametwo VARCHAR(255),
    paymentstwo VARCHAR(255)
);
CREATE TABLE clientapis (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(255),
    apikey VARCHAR(255),
    company VARCHAR(255),
    apitype VARCHAR(255),
    companycolor VARCHAR(255)
);
--select *
--from restaurants
--    left join(
--        select restaurant_id,
--            count(*),
--            TRUNC(AVG(rating, 1)) as average_rating
--        from reviews
--        group by restaurant_id
--    ) reviews on restaurants.id = reviews.restaurant_id;

