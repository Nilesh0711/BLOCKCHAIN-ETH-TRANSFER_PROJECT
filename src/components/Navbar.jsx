import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};
 
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center">
        {["Market", "Exchange", "Wallets", "Tutorials"].map((items, index) => (
          <NavbarItem key={items + index} title={items} />
        ))}
      </ul>

      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            className="text-white cursor-pointer md:hidden"
            fontSize={21}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            className="text-white cursor-pointer md:hidden"
            fontSize={21}
            onClick={() => setToggleMenu(true)}
          />
        )}

        {toggleMenu && (
          <ul className="p-3 fixed w-[70vw] shadow-2xl md:hidden h-screen -top-0 animate-slide-in -right-2 items-end rounded-md text-white blue-glassmorphism flex flex-col justify-start">
            <li className="text-xl w-full my-2" ><AiOutlineClose onClick={()=> setToggleMenu(false)}/></li>
            {["Market", "Exchange", "Wallets", "Tutorials"].map(
              (items, index) => (
                <NavbarItem key={items + index} title={items} classProps={"my-2 text-lg"} />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
