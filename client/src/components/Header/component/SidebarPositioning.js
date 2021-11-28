import React from "react"
import Sidebar from "../../Sidebar/Sidebar";
import routes from "../../../routes";

const SidebarPositioning = (props) => {
  const [activeColor] = React.useState("blue");
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [sidebarOpened, setSidebarOpened] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0);
  const closeSidebar = () => {
    setSidebarOpened(false);
    document.documentElement.classList.remove("nav-open");
  };
  return (
    <div>
      <div style={{position: "absolute", visibility: "hidden"}}>
        {setOpacity}
        {sidebarOpened}
        {sidebarMini}
        {opacity}
        {setSidebarMini}
      </div>
      <Sidebar
        {...props}
        routes={routes}
        activeColor={activeColor}
        logo={{
          outterLink: "",
          text: "Drivers Data"
        }}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}

export default SidebarPositioning
