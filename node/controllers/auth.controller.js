import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const sql = "select * from user where email=?";
    db.query(sql, email, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (data.length === 0) {
                res.status(300).send("Invalid Email!");
            } else {
                // const user = data[0];
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (result) {
                        console.log(data[0])
                        const { password, isAdmin, ...others } = data[0];
                        const token = jwt.sign(
                            { id: data[0].id, isAdmin: data[0].isAdmin },
                            process.env.JWT
                        );
                        // {id:data[0].id,isAdmin:data[0].isAdmin,process.env.JWT}
                        res.cookie("access_token", token, {
                            httpOnly: true,
                        })
                            .status(200)
                            .json({ details: others, isAdmin });
                    }else{
                        res.status(401).send("Incorrect Password!!")
                    }
                });
            }
            // else if (data[0].password !== password) {
            //     res.status(200).send("Incorrect Password!!");
            // } else {
            //     console.log(data);
            //     const { password, isAdmin, ...others } = data[0];
            //     const token = jwt.sign(
            //         { id: data[0].id, isAdmin: data[0].isAdmin },
            //         process.env.JWT
            //     );
            //     // {id:data[0].id,isAdmin:data[0].isAdmin,process.env.JWT}
            //     res.cookie('access_token',token, {
            //         httpOnly: true,
            //     })
            //         .status(200)
            //         .json({ details: others, isAdmin });
            // }
        }
    });
};

export const Logout=(req,res)=>{
    res.clearCookie("access_token");
    res.status(200).json({message:"User logged out"});
}
