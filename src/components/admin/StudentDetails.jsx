import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import api from "../../api/axios"
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
} from "@mui/material"
import { Search } from "lucide-react"

export const StudentDetails = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState(null)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchStudents() // Fetch all students when component mounts
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await api.get("/student")
      setStudents(response.data.data) // ✅ Ensure data structure matches API response
    } catch (error) {
      console.error("Error fetching students:", error.response?.data?.message || error.message)
      setError("Failed to fetch students")
    } finally {
      setLoading(false)
    }
  }

  const handleSemesterClick = (semester) => setSelectedSemester(semester)
  const handleBackToDetails = () => setSelectedSemester(null)

  const isValidRegNo = (regNo) => /^120[a-z]{2}2[0-9]{4}$/.test(regNo)

  // Filter students based on search query
  const filteredStudents = students.filter((s) =>
    s.registerNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6">
      <Typography variant="h5" className="mb-6">Student Details</Typography>

      <TextField
        fullWidth
        placeholder="Search by Reg. No. (e.g., 120CS22042)"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        error={searchQuery !== "" && !isValidRegNo(searchQuery)}
        helperText={searchQuery !== "" && !isValidRegNo(searchQuery) ? "Invalid registration number format" : ""}
        InputProps={{ startAdornment: <Search className="mr-2 text-gray-400" /> }}
      />

      {loading && <Typography className="mt-4">Loading...</Typography>}
      {error && <Typography color="error" className="mt-4">{error}</Typography>}

      {filteredStudents.length > 0 ? (
        <Grid container spacing={2} className="mt-4">
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.registerNumber}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{student.fullName}</Typography>
                  <Typography variant="body2" color="textSecondary">Reg. No: {student.registerNumber}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setStudent(student)}
                    className="mt-2"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No matching students found</Typography>
      )}

      {student && (
        <Dialog open={true} onClose={() => setStudent(null)} maxWidth="md" fullWidth>
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Typography variant="h6">{student.fullName}'s Details</Typography>
              {!selectedSemester && (
                <FormControlLabel
                  control={<Switch checked={isDetailsVisible} onChange={(e) => setIsDetailsVisible(e.target.checked)} color="primary" />}
                  label="Show Details"
                />
              )}
            </div>
          </DialogTitle>
          <DialogContent>
            {selectedSemester ? (
              <SemesterDetails semester={selectedSemester} onBack={handleBackToDetails} />
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><Typography><strong>Registration Number:</strong> {student.registerNumber}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Email:</strong> {student.email}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Phone Number:</strong> {student.phoneNumber}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Semester:</strong> {student.semester}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Branch:</strong> {student.branch?.name}</Typography></Grid>
                </Grid>

                {isDetailsVisible && (
                  <>
                    <Typography variant="h6" className="mt-4 mb-2">Academic Results</Typography>
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
                          <TableRow>
                            <TableCell colSpan={2}><strong>Overall CGPA</strong></TableCell>
                            <TableCell colSpan={2}><strong>{student.cgpa || 5}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStudent(null)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </motion.div>
  ) 
}
