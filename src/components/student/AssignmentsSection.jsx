import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useAnimatedEntry from './useAnimatedEntry';

const AssignmentsSection = () => {
  const animatedEntry = useAnimatedEntry();

  const assignments = [
    { id: 1, subject: 'Mathematics', title: 'Linear Algebra Problem Set', dueDate: '2023-06-15', status: 'Pending' },
    { id: 2, subject: 'Science', title: 'Lab Report: Photosynthesis', dueDate: '2023-06-18', status: 'Submitted' },
    { id: 3, subject: 'English', title: 'Essay on Shakespeare', dueDate: '2023-06-20', status: 'Pending' },
    { id: 4, subject: 'History', title: 'Research Paper: Industrial Revolution', dueDate: '2023-06-25', status: 'In Progress' },
    { id: 5, subject: 'Computer Science', title: 'Programming Project: Todo App', dueDate: '2023-06-30', status: 'Pending' },
  ];
  
  // Your existing code for rendering the assignments section...

  return (
    <motion.div {...animatedEntry}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assignments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={assignment.status} 
                        color={
                          assignment.status === 'Submitted' ? 'success' : 
                          assignment.status === 'Pending' ? 'warning' : 
                          'info'
                        } 
                        sx={{
                          fontWeight: 600,
                          borderRadius: '8px',
                          '& .MuiChip-label': {
                            padding: '4px 8px',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<FileText />}
                        sx={{
                          borderRadius: '8px',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        View
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

export default AssignmentsSection;