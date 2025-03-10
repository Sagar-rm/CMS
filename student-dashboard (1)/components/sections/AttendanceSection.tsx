"use client"
import { motion } from "framer-motion"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { useTheme } from "@mui/material/styles"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const AttendanceSection = () => {
  const animatedEntry = useAnimatedEntry()
  const theme = useTheme()

  const attendanceData = [
    { subject: "Mathematics", present: 28, total: 30 },
    { subject: "Science", present: 27, total: 30 },
    { subject: "English", present: 29, total: 30 },
    { subject: "History", present: 26, total: 30 },
    { subject: "Computer Science", present: 30, total: 30 },
  ]

  const pieChartData = [
    { name: "Present", value: attendanceData.reduce((sum, subject) => sum + subject.present, 0) },
    { name: "Absent", value: attendanceData.reduce((sum, subject) => sum + (subject.total - subject.present), 0) },
  ]

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main]

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Summary
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell align="right">Attendance</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {subject.subject}
                        </TableCell>
                        <TableCell align="right">
                          {subject.present}/{subject.total}
                        </TableCell>
                        <TableCell align="right">
                          <LinearProgress
                            variant="determinate"
                            value={(subject.present / subject.total) * 100}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: theme.palette.grey[200],
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 5,
                                backgroundColor: theme.palette.primary.main,
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Attendance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default AttendanceSection

