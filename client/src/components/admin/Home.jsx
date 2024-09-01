import React from "react";

const Home = () => {
    return (
        <div className="flex justify-center py-8">
            <div className="max-w-[1340px] w-full">
                <div className="flex justify-between">
                    <div className="flex flex-col shadow-lg shadow-gray-300 gap-8 py-6 px-9 rounded-lg bg-[#fff5f1]">
                        <span className="font-bold text-[50px]">Total number of User</span>
                        <span className="font-bold text-[50px] text-right">45</span>
                    </div>
                    <div className="flex flex-col shadow-lg shadow-gray-300 gap-8 py-6 px-9 rounded-lg bg-[#fff1f1]">
                        <span className="font-bold text-[50px]">Total number of Blog</span>
                        <span className="font-bold text-[50px] text-right">45</span>
                    </div>                   
                </div>
            </div>
        </div>
    );
};

export default Home;
