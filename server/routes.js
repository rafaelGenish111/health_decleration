const Query = require('./mysql');
const router = require('express').Router();

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

router.post('/find', async (req, res) => {
    const { searchTerm } = req.body
    try {
        const q = `SELECT * FROM health_declerations WHERE id LIKE CONCAT('%', ?, '%') OR first_name LIKE CONCAT('%', ?, '%') OR last_name LIKE CONCAT('%', ?, '%')`
        const data = await Query(q, [searchTerm, searchTerm, searchTerm])
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
})


router.get('/decleration/:id', async (req, res) => {
    const  id  = req.params.id
    try {
        const q = 'SELECT * FROM health_declerations WHERE id = ?'
        const data = await Query(q, [id])
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: true, msg: error })
    }
})
module.exports = router