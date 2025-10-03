import React from "react";

const Navbar=()=>{
    return(
        <>
        <div className="flex justify-between bg-slate-700 text-amber-50 py-4">
            <div className="logo">
                <span className="font-bold text-xl mx-8 cursor-pointer ">ITask</span>
            </div>
           <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold tranistion-all duration-75">Home</li>
            <li className="cursor-pointer hover:font-bold tranistion-all duration-75">Contacts</li>
           </ul>
        </div>
        </>
    )
}
export default Navbar