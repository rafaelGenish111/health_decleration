const Query = require('./mysql');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const q = 'SELECT * FROM health_declerations'
        res.json(await Query(q))
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
})

router.post('/new', async (req, res) => {
    const { id, first_name, last_name, phone, health_issues, decleration_date, signature } = req.body
    const strIssues = JSON.stringify(health_issues)
    try {
        const q = 'INSERT INTO health_declerations(id, first_name, last_name, phone, health_issues, decleration_date, signature) VALUES (?, ?, ?, ?, ?, ?, ?)'
        const data = await Query(q, [id, first_name, last_name, phone, strIssues, decleration_date, signature])
        res.status(200).json({ err: false, msg: "dec added successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
})

router.post('/:id', async (req, res) => {
    // const { id } = req.params.id
    try {
        const getDec = await Query(`SELECT * FROM health_declerations WHERE id = ${req.params.id}`) 
        if (getDec.length > 0) {
            return res.json(getDec)
        } else {
            res.status(401).json({err: true, msg: "have'nt decleration for this ID"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
})

router.get('/search', async (req, res) => {
    const {first_name, last_name, id} = req.body
    try {
        const q = `SELECT * FROM health_declerations WHERE id = ${id} OR first_name = ${first_name} OR last_name = ${last_name} `
        res.json(await Query(q))
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
})
module.exports = router