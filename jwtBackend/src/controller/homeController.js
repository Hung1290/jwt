import userService from '../service/userService'

const handleHelloWord = (req, res) => {
    return res.render("home.ejs")
}
const handleUser = async (req, res) => {
    let userList = await userService.getUserList()
    return res.render("user.ejs", { userList })
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    await userService.createNewUser(email, password, username)
    return res.redirect("/user")
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect("/user")
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id

    await userService.updateUser(email, username, id)
    return res.redirect("/user")
}

const getUpdateUser = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = {}
    userData = user
    return res.render("user-update.ejs", { userData })
}
module.exports = {
    handleHelloWord, handleUser, handleCreateNewUser, handleDeleteUser, handleUpdateUser, getUpdateUser
}