import pool from "../configs/connectDB";

export async function getAllUserApi(req,res) {
    const [userList] = await pool.execute('select * from users')
    return res.status(200).json({
        message: 'ok',
        data: userList
    })
}

export async function createUserApi(req,res) {
    const {firstName, lastName, email, address} = req.body
     
    await pool.execute('insert into users (firstName, lastName, email, address) values (?,?,?,?)', 
    [firstName, lastName, email, address])
    const [[lastId]] = await pool.execute('SELECT LAST_INSERT_ID()')

    return res.status(200).json({
        message: "ok",
        data: {
            id: lastId['LAST_INSERT_ID()'],
            firstName, 
            lastName, 
            email, 
            address
        }
    })
}  

export async function editUserApi(req, res) {
    const { userId } = req.params;
    const { firstName, lastName, email, address } = req.body;
    await pool.execute(
        "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
        [firstName, lastName, email, address, userId]
    );

  return res.status(200).json({
    message: 'ok',
    data: {
        id: userId,
        firstName, 
        lastName, 
        email, 
        address
    }
  })
}

export async function deleteUser(req,res) {
    const { userId } = req.params;
    await pool.execute("delete from users where id = ?", [userId]);
    return res.status(200).json({
        message: 'ok'
    })
}