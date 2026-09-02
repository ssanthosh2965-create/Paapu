const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Mock Data
const doctors = [
  { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiologist", rating: "4.9 ★" },
  { id: 2, name: "Dr. Michael Chen", specialty: "General Physician", rating: "4.8 ★" },
  { id: 3, name: "Dr. Amara Patel", specialty: "Pediatrician", rating: "4.9 ★" }
];

const pharmacies = [
  { id: 1, name: "HealthPlus Pharmacy", distance: "0.8 mi away", status: "In Stock" },
  { id: 2, name: "MediCare Express", distance: "1.4 mi away", status: "In Stock" },
  { id: 3, name: "City Center Pharmacy", distance: "2.1 mi away", status: "Limited Stock" }
];

// API Endpoints
app.get('/api/doctors', (req, res) => {
  res.json({ success: true, doctors });
});

app.post('/api/upload-prescription', upload.single('prescription'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  res.json({ 
    success: true, 
    filename: req.file.filename,
    originalName: req.file.originalname 
  });
});

app.get('/api/pharmacies', (req, res) => {
  res.json({ success: true, pharmacies });
});

app.post('/api/confirm', (req, res) => {
  const { doctorId, pharmacyId, prescriptionFile } = req.body;
  const bookingId = 'MF-' + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    success: true,
    bookingId,
    message: 'Your order and appointment request have been confirmed!'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MediFind API server running at http://localhost:${PORT}`);
});
