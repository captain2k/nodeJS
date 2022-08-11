import pool from "../configs/connectDB";

export async function homeController(req, res) {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  res.render("index.ejs", { userData: rows });
}

export async function detailController(req, res) {
  const { userId } = req.params;
  const [userById, fields] = await pool.execute(
    "SELECT * FROM `users` where id = ?",
    [userId]
  );
  return res.send(JSON.stringify(userById));
}

export async function createUserController(req, res) {
  const { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );

  return res.redirect("/");
}

export async function deleteUserController(req, res) {
  const { userId } = req.params;
  await pool.execute("delete from users where id = ?", [userId]);
  return res.redirect("/");
}

export async function getDetailUserController(req, res) {
  const { userId } = req.params;
  const [userDetail] = await pool.execute(
    "SELECT * FROM `users` where id = ?",
    [userId]
  );
  return res.render("editPage.ejs", { userDetail: userDetail[0] });
}

export async function updateUserController(req, res) {
  const { userId } = req.params;
  const { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, userId]
  );

  return res.redirect("/");
}

export function uploadPageController(req, res) {
  return res.render("uploadPage.ejs");
}

export function uploadController(req, res) {
  let imgHtml = "";
  for (let i = 0; i < req.files.length; i++) {
    imgHtml += `<img src="/image/${req.files[i].filename}" width="500">`;
  }
  return res.send(
    `You have uploaded this image: <hr/>${imgHtml}<hr /><a href="/uploadPage">Upload another image</a>`
  );
}
