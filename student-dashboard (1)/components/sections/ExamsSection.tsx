"use client"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material"
import { Calendar } from "react-feather"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const ExamsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const exams = [
    { id: 1, subject: "Mathematics", date: "2023-07-05", time: "09:00 AM - 11:00 AM", room: "Hall A" },
    { id: 2, subject: "Science", date: "2023-07-07", time: "10:00 AM - 12:00 PM", room: "Lab 1" },
    { id: 3, subject: "English", date: "2023-07-10", time: "09:00 AM - 11:00 AM", room: "Hall B" },
    { id: 4, subject: "History", date: "2023-07-12", time: "02:00 PM - 04:00 PM", room: "Hall C" },
    { id: 5, subject: "Computer Science", date: "2023-07-15", time: "10:00 AM - 12:00 PM", room: "Lab 2" },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Exams
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                    <TableCell>{exam.room}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Calendar />}
                        sx={{
                          borderRadius: "8px",
                          transition: "all 0.3s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        Add to Calendar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ExamsSection

