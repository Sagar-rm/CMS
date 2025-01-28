import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Search, FileText, ArrowLeft } from "lucide-react"

const SemesterDetails = ({ student, semester, onBack }) => {
  // This data should come from your actual data source
  const semesterSubjects = [
    { name: "Mathematics", marks: 85 },
    { name: "Data Structures", marks: 90 },
    { name: "Computer Networks", marks: 88 },
    { name: "Database Management", marks: 92 },
    { name: "Operating Systems", marks: 87 },
  ]

  return (
    <div className="p-6">
      <Button onClick={onBack} variant="outlined" className="mb-4" startIcon={<ArrowLeft />}>
        Back to Student Details
      </Button>
      <Typography variant="h4" className="mb-4">
        {student.name} - Semester {semester} Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="right">Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesterSubjects.map((subject, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {subject.name}
                </TableCell>
                <TableCell align="right">{subject.marks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const StudentDetails = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState(null)

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      regNo: "120CS22001",
      course: "Computer Science",
      semester: "3rd",
      branch: "Computer Science",
      year: "2nd Year",
      academicResults: [
        { semester: 1, totalMarks: 450, sgpa: 8.5 },
        { semester: 2, totalMarks: 460, sgpa: 8.7 },
        { semester: 3, totalMarks: 470, sgpa: 8.9 },
      ],
      cgpa: 8.7,
      documents: [
        { name: "Birth Certificate", url: "#" },
        { name: "High School Diploma", url: "#" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      regNo: "120EE22002",
      course: "Electrical Engineering",
      semester: "3rd",
      branch: "EE",
      year: "2nd Year",
      academicResults: [
        { semester: 1, totalMarks: 440, sgpa: 8.3 },
        { semester: 2, totalMarks: 450, sgpa: 8.5 },
        { semester: 3, totalMarks: 460, sgpa: 8.7 },
      ],
      cgpa: 8.5,
      documents: [
        { name: "Birth Certificate", url: "#" },
        { name: "High School Diploma", url: "#" },
      ],
    },
  ]

  const filteredStudents = students.filter((student) => student.regNo.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleStudentClick = (student) => {
    setSelectedStudent(student)
    setIsDetailsVisible(false)
    setSelectedSemester(null)
  }

  const handleCloseDetails = () => {
    setSelectedStudent(null)
    setSelectedSemester(null)
  }

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester)
  }

  const handleBackToDetails = () => {
    setSelectedSemester(null)
  }

  const isValidRegNo = (regNo) => {
    const regex = /^120[A-Z]{2}2[0-9]{4}$/
    return regex.test(regNo)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <Typography variant="h5" className="mb-6">
        Student Details
      </Typography>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <TextField
          fullWidth
          placeholder="Search by Reg. No. (e.g., 120CS22042)"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          error={searchQuery !== "" && !isValidRegNo(searchQuery)}
          helperText={searchQuery !== "" && !isValidRegNo(searchQuery) ? "Invalid registration number format" : ""}
          InputProps={{
            startAdornment: <Search className="mr-2 text-gray-400" />,
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <CardContent onClick={() => handleStudentClick(student)}>
              <Typography variant="h6">{student.name}</Typography>
              <Typography color="textSecondary">Reg. No: {student.regNo}</Typography>
              <Typography color="textSecondary">{student.course}</Typography>
              <Typography color="textSecondary">{student.semester} Semester</Typography>
              <Typography color="textSecondary">{student.branch}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStudent && (
        <Dialog open={true} onClose={handleCloseDetails} maxWidth="md" fullWidth>
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Typography variant="h6">{selectedStudent.name}'s Details</Typography>
              {!selectedSemester && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDetailsVisible}
                      onChange={(e) => setIsDetailsVisible(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Show Details"
                />
              )}
            </div>
          </DialogTitle>
          <DialogContent>
            {selectedSemester ? (
              <SemesterDetails student={selectedStudent} semester={selectedSemester} onBack={handleBackToDetails} />
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Registration Number:</strong> {selectedStudent.regNo}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Email:</strong> {selectedStudent.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Course:</strong> {selectedStudent.course}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Year:</strong> {selectedStudent.year}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Semester:</strong> {selectedStudent.semester}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Branch:</strong> {selectedStudent.branch}
                    </Typography>
                  </Grid>
                </Grid>

                {isDetailsVisible && (
                  <>
                    <Typography variant="h6" className="mt-4 mb-2">
                      Academic Results
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Semester</TableCell>
                            <TableCell>Total Marks</TableCell>
                            <TableCell>SGPA</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedStudent.academicResults.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell>{result.semester}</TableCell>
                              <TableCell>{result.totalMarks}</TableCell>
                              <TableCell>{result.sgpa}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleSemesterClick(result.semester)}
                                >
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={2}>
                              <strong>Overall CGPA</strong>
                            </TableCell>
                            <TableCell colSpan={2}>
                              <strong>{selectedStudent.cgpa}</strong>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Typography variant="h6" className="mt-4 mb-2">
                      Documents
                    </Typography>
                    <List>
                      {selectedStudent.documents.map((doc, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <FileText />
                          </ListItemIcon>
                          <ListItemText primary={doc.name} />
                          <Button variant="outlined" href={doc.url} target="_blank">
                            View
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </motion.div>
  )
}

