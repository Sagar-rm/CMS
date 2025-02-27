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
  TableHead,
  TableRow,
  Chip,
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { useTheme } from "@mui/material/styles"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const GradesSection = () => {
  const animatedEntry = useAnimatedEntry()
  const theme = useTheme()

  const grades = [
    {
      subject: "Mathematics",
      cie1: 45,
      cie2: 48,
      cie3: 47,
      assignment: 18,
      total: 158,
      grade: "A+",
    },
    {
      subject: "Physics",
      cie1: 42,
      cie2: 44,
      cie3: 45,
      assignment: 17,
      total: 148,
      grade: "A",
    },
    {
      subject: "Chemistry",
      cie1: 40,
      cie2: 38,
      cie3: 42,
      assignment: 16,
      total: 136,
      grade: "B+",
    },
    {
      subject: "Biology",
      cie1: 43,
      cie2: 41,
      cie3: 44,
      assignment: 18,
      total: 146,
      grade: "A",
    },
    {
      subject: "English",
      cie1: 44,
      cie2: 46,
      cie3: 45,
      assignment: 19,
      total: 154,
      grade: "A+",
    },
  ]

  const getGradeColor = (total) => {
    if (total >= 150) return "#4CAF50" // Green for A+
    if (total >= 140) return "#6C63FF" // Primary purple for A
    if (total >= 130) return "#FF9800" // Orange for B+
    if (total >= 120) return "#FFC107" // Yellow for B
    return "#F44336" // Red for lower grades
  }

  const getGradientColor = (total) => {
    return {
      stop1: getGradeColor(total),
      stop2: `${getGradeColor(total)}88`,
    }
  }

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h6">Grade Summary</Typography>
                <div className="flex gap-2">
                  <Chip label="Semester 1" color="primary" variant="filled" className="font-semibold" />
                  <Chip label="2023-24" variant="outlined" color="primary" className="font-semibold" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-50">
                      <TableCell className="font-semibold">Subject</TableCell>
                      <TableCell align="center" className="font-semibold">
                        CIE 1 (50)
                      </TableCell>
                      <TableCell align="center" className="font-semibold">
                        CIE 2 (50)
                      </TableCell>
                      <TableCell align="center" className="font-semibold">
                        CIE 3 (50)
                      </TableCell>
                      <TableCell align="center" className="font-semibold">
                        Assignment (20)
                      </TableCell>
                      <TableCell align="center" className="font-semibold">
                        Total (170)
                      </TableCell>
                      <TableCell align="center" className="font-semibold">
                        Grade
                      </TableCell>
                      <TableCell align="center" className="font-semibold">
                        Progress
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {grades.map((grade, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{grade.subject}</TableCell>
                        <TableCell align="center">{grade.cie1}</TableCell>
                        <TableCell align="center">{grade.cie2}</TableCell>
                        <TableCell align="center">{grade.cie3}</TableCell>
                        <TableCell align="center">{grade.assignment}</TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            className="font-bold"
                            style={{ color: getGradeColor(grade.total) }}
                          >
                            {grade.total}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={grade.grade}
                            size="small"
                            className="font-bold"
                            style={{
                              backgroundColor: getGradeColor(grade.total),
                              color: "white",
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" className="w-32">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${(grade.total / 170) * 100}%`,
                                background: `linear-gradient(90deg, ${getGradientColor(grade.total).stop1} 0%, ${getGradientColor(grade.total).stop2} 100%)`,
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Grade Distribution
              </Typography>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={grades}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 170]} />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-2 shadow rounded border">
                              <p className="font-semibold">{data.subject}</p>
                              <p>Total: {data.total}/170</p>
                              <p>Grade: {data.grade}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="total" name="Total Score">
                      {grades.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getGradeColor(entry.total)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Overview
              </Typography>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={grades}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 170]} />
                    <Radar
                      name="Total Score"
                      dataKey="total"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.main}
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default GradesSection

