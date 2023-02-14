const mongoose = require("mongoose");

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const stock = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 };

// ------- User Model -------

// Create schema for Users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroups, required: true },
    email: { type: String },
    phone: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String },
});

// Create model for Users
const User = mongoose.model('Users', userSchema);

// ------- Donations Model -------

// Create schema for Donations
const bloodDonations = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBanks', required: true },
    units: { type: Number, required: true },
    date: { type: String, required: true },
    disease: { type: String },
    status: { type: String, required: true, 
              enum: ['Pending', 'Approved', 'Denied', 'Donated'], 
              default: 'Pending' 
            },
});

// Create model for Donors
const Donations = mongoose.model('Donations', bloodDonations);


// ------- Requests Model -------

// Create schema for Patients
const bloodRequests = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBanks', required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroups, required: true },
    units: { type: Number, required: true },
    date: { type: String, required: true },
    reason: { type: String },
    status: { type: String, 
              enum: ['Pending', 'Approved', 'Denied', 'Completed'], 
              default: 'Pending'
             }
});

// Create model for Patients
const Requests = mongoose.model('Requests', bloodRequests);


// ------- Blood Bank Model -------

// Create schema for Blood Banks
const bloodBankSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hospital: { type: String, required: true },
    contactPerson: { type: String },
    category: { type: String, required: true },
    website: { type: String },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    requests: [{
        requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Requests' },
    }],
    donations: [{
        donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donations' },
    }],
    stock: {
        'A+': { type: Number, default: 0 },
        'A-': { type: Number, default: 0 },
        'B+': { type: Number, default: 0 },
        'B-': { type: Number, default: 0 },
        'AB+': { type: Number, default: 0 },
        'AB-': { type: Number, default: 0 },
        'O+': { type: Number, default: 0 },
        'O-': { type: Number, default: 0 }
    }
});

// Create model for Blood Banks
const BloodBank = mongoose.model('BloodBanks', bloodBankSchema);

// Create schema for Camps
const campSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBanks' },
    organizer: { type: String, required: true },
    contact: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    donors: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', unique: true },
        units: { type: Number, required: true, default: 0 },
        status: { type: Number, enum: [0, 1], default: 0 }
    }]
});

// Create model for Camps
const Camp = mongoose.model('Camps', campSchema);



// Exports

module.exports = { User, Donations, Requests, BloodBank, Camp };