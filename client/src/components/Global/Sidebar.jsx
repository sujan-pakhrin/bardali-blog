import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    return (
        

        
        <div
            className={`${
                open ? "w-[250px] bg-red-400 " : "bg-none"
            } h-[100vh] absolute`}
        >
            {!open ? (
               

                    <FaBars
                        className="mt-5 ml-5 text-xl h-[30px] w-[30px]"
                        onClick={() => setOpen((prev) => !prev)}
                    />

            ) : (
                ""
            )}
            {open && (
                <div className="w-full p-5 relative">
                    
                    <FaTimes 
                        className="text-xl absolute top-4 right-4 h-[17px] w-[17px]"
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <div className="flex flex-col justify-between h-[90vh] items-center mt-7">
                        <ul className="flex flex-col items-center gap-5 ">
                            <li>Home</li>
                            <li>Our Products</li>
                            <li>About Us</li>
                            <li>Contacts Us</li>
                        </ul>
                        <div className="flex flex-col items-center gap-3">
                            <span >Name</span>
                            <img src="https://avatar.iran.liara.run/public/38" className="h-[50px] w--[50px] object-cover" alt="img" />
                            <button>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
