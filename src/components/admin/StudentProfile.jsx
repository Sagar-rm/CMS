import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FiBook, FiCalendar, FiAward } from 'react-icons/fi'

export default function StudentProfile({ student }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://avatars.dicebear.com/api/initials/${student.name}.svg`} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center"><FiBook className="mr-2" /> Course Information</h3>
              <p><span className="font-medium">Current Course:</span> {student.course}</p>
              <p><span className="font-medium">Batch:</span> {student.batch}</p>
              <p><span className="font-medium">Progress:</span></p>
              <Progress value={(student.completedCourses / student.totalCourses) * 100} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {student.completedCourses} out of {student.totalCourses} courses completed
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center"><FiCalendar className="mr-2" /> Attendance & Performance</h3>
              <p><span className="font-medium">Attendance Rate:</span> {student.attendance}</p>
              <p>
                <span className="font-medium">Performance:</span>
                <Badge variant={student.performance === 'Excellent' ? 'default' : 'secondary'} className="ml-2">
                  {student.performance}
                </Badge>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2 flex items-center"><FiAward className="mr-2" /> Awards & Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {student.awards.map((award, index) => (
                <Badge key={index} variant="outline">{award}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

