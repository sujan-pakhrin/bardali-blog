import db from "../db.js";
import bcrypt from "bcryptjs";
export const createUser = (req, res) => {
    console.log(req.file);
    const profile = req.file.filename;
    const { f_name, l_name, address, email, password, phone, gender, dob } =
        req.body;
    const created_at = new Date();
    const sql = "select * from user where email=?";
    db.query(sql, email, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if (data.length > 0) {
                res.send({
                    statuscode: 300,
                    message: "Email already exists!!",
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.send(err);
                    } else {
                        const sql =
                            "Insert into user(f_name,l_name,address,email,password,phone,gender,dob,profile,created_at) value(?,?,?,?,?,?,?,?,?,?)";
                        const values = [f_name,l_name,address,email,hash,phone,gender,dob,profile,created_at];
                        db.query(sql, values, (err, result) => {
                            if (err) return res.send(err);
                            res.send({
                                data: result,
                                message: "signup sucessfully",
                            });
                        });
                    }
                });
                // const sql =
                //     "Insert into user(f_name,l_name,address,email,password,phone,gender,dob,profile,created_at) value(?,?,?,?,?,?,?,?,?,?)";
                // const values = [
                //     f_name,
                //     l_name,
                //     address,
                //     email,
                //     password,
                //     phone,
                //     gender,
                //     dob,
                //     profile,
                //     created_at,
                // ];
                // db.query(sql, values, (err, result) => {
                //     if (err) return res.send(err);
                //     res.send({ data: result, message: "signup sucessfully" });
                // });
            }
        }
    });
};

export const getUsers = (req, res) => {
    const sql = "select * from user";
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                statusCode: 400,
                message: "something went wrong!",
                err: err,
            });
        } else {
            res.send(data);
        }
    });
};

export const getUser = (req, res) => {
    const id = parseInt(req.params.id);
    const sql = "select * from user where user_id=?";
    db.query(sql, id, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            // res.send(result)
            const { password, ...rest } = result[0];
            res.send(rest);
        }
    });
};

// export const updateUser = (req, res) => {
//     const { f_name, l_name, address, email, password, phone, gender, dob } = req.body;
//     const id = parseInt(req.params.id);

//     const sql = "UPDATE user SET  f_name=?, l_name=?, address=?, email=?, password=?, phone=?, gender=?, dob=?  WHERE id=?";
//     const values = [name, email, password, id];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .send({ statusCode: 500, message: "Something went wrong!!" });
//         }

//         res.send({ statusCode: 200, message: "User updated successfully!" });
//     });
// };

// export const deleteUser = (req, res) => {
//     const id = parseInt(req.params.id);
//     const sql = "delete from user where id=?";
//     db.query(sql, id, (err, data) => {
//         if (err) res.sed(err);
//         res.send({ data: data, message: "user deleted sucessfully" });
//     });
// };
