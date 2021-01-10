import {clientUrl} from '../config'

export default function (app) {
    app.get("/", (req, res) => {
        res.send({message: "Welcome bitches!"})
    })
}