import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useAnimatedEntry from './useAnimatedEntry';

const ActivitiesSection = () => {
  const animatedEntry = useAnimatedEntry();

  const activities = [
    { id: 1, name: 'Chess Club', day: 'Monday', time: '4:00 PM - 5:30 PM', location: 'Room 105' },
    { id: 2, name: 'Debate Team', day: 'Tuesday', time: '3:30 PM - 5:00 PM', location: 'Auditorium' },
    { id: 3, name: 'Science Fair Prep', day: 'Wednesday', time: '4:00 PM - 6:00 PM', location: 'Science Lab' },
    { id: 4, name: 'Art Club', day: 'Thursday', time: '3:00 PM - 4:30 PM', location: 'Art Room' },
    { id: 5, name: 'Sports Practice', day: 'Friday', time: '4:00 PM - 6:00 PM', location: 'Gymnasium' },
  ];
  
  // Your existing code for rendering the activities section...

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Extracurricular Activities
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity</TableCell>
                  <TableCell>Day</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.day}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                    <TableCell>{activity.location}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{
                          borderRadius: '8px',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        Join
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
  );
};

export default ActivitiesSection;