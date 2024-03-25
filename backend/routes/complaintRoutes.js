import express from "express";
import {
    authenticateUser, 
    registerUser,
    getComplaints, 
    sendComplaint, 
    updateComplaint, 
    removeComplaint,
    sendConfirmationEmail,
    confirmSatisfaction,
    confirmDissatisfaction 
} from "../controller/UserController.js"

const router = express.Router();

router.get('/get-complaints', getComplaints)
router.post('/send-email', sendConfirmationEmail)
router.get('/confirm-satisfaction', confirmSatisfaction)
router.get('/confirm-dissatisfaction', confirmDissatisfaction)
router.post('/auth', authenticateUser)
router.post('/add', registerUser)
router.post('/send-complaint', sendComplaint)
router.put('/update-complaint/:id', updateComplaint)
router.delete('/remove-complaint/:id', removeComplaint)




export default router;