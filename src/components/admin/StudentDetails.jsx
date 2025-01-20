import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, FormControlLabel, Switch, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Search, FileText } from 'lucide-react'

export const StudentDetails = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const students = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      regNo: 'CS2023001', 
      course: 'Computer Science', 
      semester: '3rd', 
      branch: 'Computer Science', 
      year: '2nd Year',
      academicResults: [
        { subject: 'Data Structures', grade: 'A' },
        { subject: 'Algorithms', grade: 'B+' },
        { subject: 'Database Management', grade: 'A-' },
      ],
      documents: [
        { name: 'Birth Certificate', url: '#' },
        { name: 'High School Diploma', url: '#' },
      ]
    },
    // ... other student data
  ]

  const filteredStudents = students.filter(student =>
    (student.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSemester === '' || student.semester === selectedSemester) &&
    (selectedBranch === '' || student.branch === selectedBranch)
  )

  const handleStudentClick = (student) => {
    setSelectedStudent(student)
    setIsDetailsVisible(false)
  }

  const handleCloseDetails = () => {
    setSelectedStudent(null)
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
          placeholder="Search by Reg. No. or Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search className="mr-2 text-gray-400" />
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Semester</InputLabel>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            label="Semester"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1st">1st</MenuItem>
            <MenuItem value="2nd">2nd</MenuItem>
            <MenuItem value="3rd">3rd</MenuItem>
            <MenuItem value="4th">4th</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Branch</InputLabel>
          <Select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            label="Branch"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
            <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
          </Select>
        </FormControl>
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
        <Dialog
          open={true}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Typography variant="h6">{selectedStudent.name}'s Details</Typography>
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
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Registration Number:</strong> {selectedStudent.regNo}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Email:</strong> {selectedStudent.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Course:</strong> {selectedStudent.course}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Year:</strong> {selectedStudent.year}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Semester:</strong> {selectedStudent.semester}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Branch:</strong> {selectedStudent.branch}</Typography>
              </Grid>
            </Grid>

            {isDetailsVisible && (
              <>
                <Typography variant="h6" className="mt-4 mb-2">Academic Results</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Grade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedStudent.academicResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.subject}</TableCell>
                          <TableCell>{result.grade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="h6" className="mt-4 mb-2">Documents</Typography>
                <List>
                  {selectedStudent.documents.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <FileText />
                      </ListItemIcon>
                      <ListItemText primary={doc.name} />
                      <Button variant="outlined" href={doc.url} target="_blank">View</Button>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </motion.div>
  )
}

