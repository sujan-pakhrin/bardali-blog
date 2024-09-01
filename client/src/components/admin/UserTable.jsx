import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
    const [data, setData] = useState([]);
    console.log(data);
    // const navigate = useNavigate();

    const fetchData = async () => {
        await axios
            .get("http://localhost:5550/api/user")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // const handleUpdate = (user_id) => {
    //     // Navigate to the update page with user_id
    //     navigate(`/user/${user_id}`);
    // };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="text-end max-w-[1300px] w-full flex flex-col gap-8 justify-center">
                <div className="text-end">
                    <button
                        onClick={() => navigate("/adduser")}
                        className="bg-[#437EF7] py-2 px-6 rounded-md text-white mt-10"
                    >
                        Add User
                    </button>
                </div>
                <div>
                    <div style={{ height: "100%", width: "100%" }}>
                        <DataGrid
                            rows={data}
                            columns={[
                                {
                                    field: "user_id",
                                    headerName: "ID",
                                    width: 50,
                                },
                                {
                                    field: "f_name",
                                    headerName: "First Name",
                                    width: 110,
                                },
                                {
                                    field: "l_name",
                                    headerName: "Last Name",
                                    width: 110,
                                },
                                {
                                    field: "email",
                                    headerName: "Email",
                                    width: 190,
                                },
                                {
                                    field: "phone",
                                    headerName: "Phone",
                                    width: 130,
                                },
                                {
                                    field: "address",
                                    headerName: "Address",
                                    width: 150,
                                },
                                {
                                    field: "gender",
                                    headerName: "Gender",
                                    width: 100,
                                },
                                {
                                    field: "dob",
                                    headerName: "Date of Birth",
                                    width: 100,
                                    renderCell: (params) => {
                                        const date = new Date(params.value);
                                        return date.toLocaleDateString(); // Format to "MM/DD/YYYY" or localized format
                                    },
                                },
                                {
                                    field: "action",
                                    headerName: "Action",
                                    width: 120,
                                    renderCell: (params) => (
                                        <Button>
                                            <button
                                                onClick={() =>
                                                    handleUpdate(
                                                        params.row.user_id
                                                    )
                                                }
                                                className="bg-[#437EF7] text-white px-6 py-2 rounded-md"
                                            >
                                                Update
                                            </button>
                                        </Button>
                                    ),
                                },
                                {
                                    field: " ",
                                    headerName: "",
                                    width: 120,
                                    renderCell: () => (
                                        <Button>
                                            <button className="bg-red-500 text-white px-6 py-2 rounded-md">
                                                Delete
                                            </button>
                                        </Button>
                                    ),
                                },
                            ]}
                            getRowId={(row) => row.user_id}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
