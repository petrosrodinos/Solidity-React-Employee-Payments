import { useContext } from "react";
import { ContractContext } from "../context/contractContext";
import RightMenu from "./RightMenu";

const NavBar = () => {
  const { account } = useContext(ContractContext);
  return (
    <nav className="menuBar">
      <div className="menuCon">
        <div className="leftMenu">
          <div className="logo">
            <a>{`Address: ${account ? account : "-"}`}</a>
          </div>
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
