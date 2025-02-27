"use client"
import { motion } from "framer-motion"
import { Grid, Card, CardContent, Typography } from "@mui/material"
import { Award, Calendar, Heart } from "react-feather"
import { useTheme } from "@mui/material/styles"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const AchievementsSection = () => {
  const animatedEntry = useAnimatedEntry()
  const theme = useTheme()

  const achievements = [
    {
      id: 1,
      title: "Honor Roll",
      description: "Achieved for maintaining a GPA above 3.5",
      date: "2023-05-15",
      icon: Award,
    },
    {
      id: 2,
      title: "Science Fair Winner",
      description: "First place in the annual science fair",
      date: "2023-04-20",
      icon: Award,
    },
    {
      id: 3,
      title: "Perfect Attendance",
      description: "No absences for the entire semester",
      date: "2023-06-01",
      icon: Calendar,
    },
    {
      id: 4,
      title: "Math Olympiad Finalist",
      description: "Reached the finals of the state Math Olympiad",
      date: "2023-03-10",
      icon: Award,
    },
    {
      id: 5,
      title: "Community Service Award",
      description: "Completed 100 hours of community service",
      date: "2023-05-30",
      icon: Heart,
    },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Grid container spacing={3}>
        {achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <achievement.icon className="mr-2" size={24} color={theme.palette.primary.main} />
                    <Typography variant="h6" color="primary">
                      {achievement.title}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {achievement.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Achieved on: {achievement.date}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}

export default AchievementsSection

