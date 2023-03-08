import { express } from "express";
import dotenv from "dotenv";
dotenv.config()
const app = express();
app.use()
const PORT = process.env.PORT || 8080

// get users

app.get("/api/v1/users", async(req,res) => {
    try {
        res.json({
            status: "success",
            data: "get users: "
        })
    } catch (error) {
        res.json(error.message)
    }
});
// delete user
app.delete("/api/v1/users/id", async(req,res) => {
    const userid = req.params.id;
    try {
        res.json({
            status: "success",
            data: "users account deleted sucessfully "
        })
    } catch (error) {
        res.json(error.message)
    }
})
app.listen(PORT, console.log(`App started at ${PORT}`));
