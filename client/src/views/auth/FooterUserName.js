import React, {useEffect, useState} from "react"

const FooterUserName = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "POST",
        headers: { 'Authorization': `token ${localStorage.token}` }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <React.Fragment>
      Logged in as {name}
    </React.Fragment>
  );
}

export default FooterUserName
