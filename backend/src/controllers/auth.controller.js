const Student = require('../models/student.model'); // Import Student model
const Faculty = require('../models/faculty.model'); // Import Faculty model
const asyncHandler = require('../utils/asyncHandler'); // Import asyncHandler

// Check Authentication
const checkAuth = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user; // Assuming `req.user` contains userId from JWT

    // Attempt to find the user in the Student collection
    let user = await Student.findById(userId).select("-password -refreshToken");

    if (!user) {
        // If not found in Student, attempt Faculty collection
        user = await Faculty.findById(userId).select("-password -refreshToken");
    }

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User is authenticated', user });
});

router.get('/check-auth', verifyJWT, checkAuth);
