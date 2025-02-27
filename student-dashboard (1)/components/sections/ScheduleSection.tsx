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
} from "@mui/material"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const ScheduleSection = () => {
  const animatedEntry = useAnimatedEntry()
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "09:00 AM - 10:30 AM", subject: "Mathematics", room: "Room 101" },
        { time: "11:00 AM - 12:30 PM", subject: "English", room: "Room 202" },
        { time: "02:00 PM - 03:30 PM", subject: "Science", room: "Lab 1" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { time: "09:00 AM - 10:30 AM", subject: "History", room: "Room 303" },
        { time: "11:00 AM - 12:30 PM", subject: "Computer Science", room: "Lab 2" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { time: "09:00 AM - 10:30 AM", subject: "Mathematics", room: "Room 101" },
        { time: "11:00 AM - 12:30 PM", subject: "Science", room: "Lab 1" },
        { time: "02:00 PM - 03:30 PM", subject: "English", room: "Room 202" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { time: "09:00 AM - 10:30 AM", subject: "Computer Science", room: "Lab 2" },
        { time: "11:00 AM - 12:30 PM", subject: "History", room: "Room 303" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { time: "09:00 AM - 10:30 AM", subject: "English", room: "Room 202" },
        { time: "11:00 AM - 12:30 PM", subject: "Mathematics", room: "Room 101" },
        { time: "02:00 PM - 03:30 PM", subject: "Science", room: "Lab 1" },
      ],
    },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {schedule.map((day, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {day.day}
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Room</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {day.classes.map((classInfo, classIndex) => (
                          <TableRow key={classIndex}>
                            <TableCell>{classInfo.time}</TableCell>
                            <TableCell>{classInfo.subject}</TableCell>
                            <TableCell>{classInfo.room}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}

export default ScheduleSection

