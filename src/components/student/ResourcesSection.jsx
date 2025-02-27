"use client"
import { motion } from "framer-motion"
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material"
import { Book, Download } from "react-feather"

const useAnimatedEntry = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
})

const ResourcesSection = () => {
  const animatedEntry = useAnimatedEntry()
  const resources = [
    { id: 1, title: "Mathematics Textbook", type: "PDF", size: "15 MB" },
    { id: 2, title: "Science Lab Manual", type: "PDF", size: "8 MB" },
    { id: 3, title: "English Literature Anthology", type: "EPUB", size: "12 MB" },
    { id: 4, title: "History Documentary", type: "MP4", size: "1.2 GB" },
    { id: 5, title: "Programming Tutorial Series", type: "ZIP", size: "500 MB" },
  ]

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Learning Resources
          </Typography>
          <List>
            {resources.map((resource) => (
              <ListItem key={resource.id}>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText primary={resource.title} secondary={`${resource.type} • ${resource.size}`} />
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Download />}
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ResourcesSection

