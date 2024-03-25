import asyncHandler from "express-async-handler"
import UserComplaint from "../models/userComplaint.js"
import nodemailer from 'nodemailer'

const authenticateUser = asyncHandler (async(req,res) => {
    res.status(200).json({message: "User auththenticated"})
})

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({message: "User added"})
})


// create complaint
const sendComplaint = asyncHandler(async (req,res) => {
    const { email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer} = req.body;
    const complaint = await UserComplaint.create({
        email, 
        date,
        issue, 
        department, 
        timeIn, 
        timeOut, 
        outcome, 
        MIS_Officer, 
        confirmationOfficer
    })
    if (complaint) {
        res.status(201).json({complaint})
    } else {
       console.log("Invalid data")
    }
})


// read complaints
const getComplaints = asyncHandler(async (req,res) => {
    const complaints = await UserComplaint.find({}).sort({createdAt: -1})
    res.status(200).json({complaints})
})


// update complaint
const updateComplaint = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the complaint ID from the request parameters
    const { email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer } = req.body; // Get the updated complaint data from the request body
    const complaint = await UserComplaint.findById(id);
  
    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }
  
    // Update the complaint with the new values
    complaint.email = email || complaint.email;
    complaint.date = date || complaint.date;
    complaint.issue = issue || complaint.issue;
    complaint.department = department || complaint.department;
    complaint.timeIn = timeIn || complaint.timeIn;
    complaint.timeOut = timeOut || complaint.timeOut;
    complaint.outcome = outcome || complaint.outcome;
    complaint.MIS_Officer = MIS_Officer || complaint.MIS_Officer;
    complaint.confirmationOfficer = confirmationOfficer || complaint.confirmationOfficer;
  
    await complaint.save();
  
    res.status(200).json({ message: "Complaint updated", data: complaint });
  });
  


// delete complaint
const removeComplaint = asyncHandler(async (req,res) => {
    const {id} = req.params
    const complaint = await UserComplaint.findByIdAndDelete(id)

    if (!complaint) {
        res.status(404);
        throw new Error('Complaint not found');
      }    
      res.status(200).json({ message: "Complaint removed" });
})



const sendConfirmationEmail = async () => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'distrodistro287@gmail.com',
            pass: 'bonfyxbjkgfglwaj'
        }
    });

   
    // Email content
    let mailOptions = {
        from: 'HELPDESK',
        to: 'levaakai@gmail.com',
        subject: 'Confirmation of Service',
        html: `
        <html>
            <head></head>
            <body>

                <div>
                <p>Were you satisfied with the help received? Please confirm your satisfaction:</p>
                
                <a href="#" style="background-color: initial;
                    background-image: linear-gradient(-180deg, #00D775, #00BD68);
                    border-radius: 5px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
                    color: #FFFFFF;
                    cursor: pointer;
                    font-family: Inter,-apple-system,system-ui,Roboto,'Helvetica Neue',Arial,sans-serif;
                    font-style: bold;
                    font-size: 16px;
                    height: 44px;
                    line-height: 44px;
                    outline: 0;
                    overflow: hidden;
                    padding: 15px 20px;
                    pointer-events: auto;
                    position: relative;
                    text-align: center;
                    touch-action: manipulation;
                    user-select: none;
                    -webkit-user-select: none;
                    vertical-align: top;
                    white-space: nowrap;
                    width: 100%;
                    z-index: 9;
                    border: 0;
                    text-decoration: none;
                    " 
                > 
                Confirm Satisfaction
                </a>

                <br>


                
                <p>If you are dissatisfied, please click the button below:</p>


                <a href="#" style="background-color: initial;
                    background-image: linear-gradient(-180deg, #FF7E31, #E62C03);
                    border-radius: 5px;
                    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
                    color: #FFFFFF;
                    cursor: pointer;
                    font-family: Inter,-apple-system,system-ui,Roboto,'Helvetica Neue',Arial,sans-serif;
                    font-style: bold;
                    font-size: 16px;
                    height: 44px;
                    line-height: 44px;
                    outline: 0;
                    overflow: hidden;
                    padding: 15px 20px;
                    pointer-events: auto;
                    position: relative;
                    text-align: center;
                    touch-action: manipulation;
                    user-select: none;
                    -webkit-user-select: none;
                    vertical-align: top;
                    white-space: nowrap;
                    width: 100%;
                    z-index: 9;
                    border: 0;
                    margin: 0 auto;
                    text-decoration: none;" 
                >
                    Confirm Dissatisfaction
                </a>
            </div>
            </body>
        </html>`
    };
  
    console.log('Sending confirmation email...');
  
    // Send email
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  

// Endpoint for sending confirmation email
// app.get('/send-email', async (req, res) => {
//     try {
//         const mailOptions = {
//             from: 'distrodistro287@gmail.com',
//             to: 'levaakai@gmail.com',
//             subject: 'Confirmation of Service',
//             html: `
//                 <p>Were you satisfied with the help received? Please confirm your satisfaction:</p>
//                 <a href="#">Confirm Satisfaction</a>
//                 <br>
//                 <p>If you are dissatisfied, please click the button below:</p>
//                 <a href="#">Confirm Dissatisfaction</a>
//             `
//         };

//         await transporter.sendMail(mailOptions);
//         res.send('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error sending email');
//     }
// });


const confirmSatisfaction = asyncHandler(async (req, res) => {
    res.status(201).json({message: "satisfaction confirmed"})
})

const confirmDissatisfaction = asyncHandler(async (req, res) => {
    res.status(201).json({message: "Dissatisfaction confirmed"})
})



export {
    authenticateUser, 
    registerUser, 
    sendComplaint, 
    getComplaints, 
    updateComplaint, 
    removeComplaint,
    sendConfirmationEmail,
    confirmSatisfaction,
    confirmDissatisfaction
 }