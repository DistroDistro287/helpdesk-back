
import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
    email: {
        type: "String",
        required: true 
    },
    date: {
        type: Date,
        required: true
    }, 
    issue: {
        type: "String",
        required: true
    },
    department: {
        type: "String",
        enum: ['Human Resource', 'Public Relation', 'Audit', 'Finance', 'Research & Monitoring Evaluation', 'Shipper Services'],
        required: true
    },
    timeIn: {
        type: "String",
        required: true
    },
    timeOut: {
        type: "String",
        required: true
    },
    outcome: {
        type: "String",
        required: true
    },
    MIS_Officer: {
        type: "String",
        enum: ['Ben','Daniel', 'NSP'],
        required: true
    },
    confirmationOfficer: {
        type: "String",
        required: true
    }
}, {
    // virtual property to format date as DD-MM-YY
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.date = formatDate(ret.date); // Format date
            return ret;
        }
    }
});

// Virtual property to format date as DD-MM-YY
complaintSchema.virtual('formattedDate').get(function() {
    return formatDate(this.date);
});

// Function to format date as DD-MM-YY
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(2);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
}

const UserComplaint = mongoose.model('UserComplaint', complaintSchema);

export default UserComplaint;





// // import mongoose from "mongoose";

// // const complaintSchema = mongoose.Schema({
// //     email: {
// //         type: "String",
// //         required: true 
// //     }
// // })


// // const UserComplaint = mongoose.model('UserComplaint', complaintSchema)

// // export default UserComplaint;
// import mongoose from "mongoose";

// const complaintSchema = mongoose.Schema({
//     email: {
//         type: "String",
//         required: true 
//     },
//     date: {
//         type: Date,
//         required: true
//     }, 
//     issue: {
//         type: "String",
//         required: true
//     },
//     department: {
//         type: "String",
//         enum: ['Human Resource', 'Public Relation', 'Audit', 'Finance', 'Research & Monitoring Evaluation', 'Shipper Services'],
//         required: true
//     },
//     timeIn: {
//         type: "String",
//         required: true
//     },
//     timeOut: {
//         type: "String",
//         required: true
//     },
//     outcome: {
//         type: "String",
//         required: true
//     },
//     MIS_Officer: {
//         type: "String",
//         enum: ['Ben','Daniel', 'NSP'],
//         required: true
//     },
//     confirmationOfficer: {
//         type: "String",
//         required: true
//     },
// }) 




// const UserComplaint = mongoose.model('UserComplaint', complaintSchema)

// export default UserComplaint;