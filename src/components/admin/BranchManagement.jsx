import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export const BranchManagement = () => {
  const [branches, setBranches] = useState([
    { id: 1, name: 'Main Campus', location: 'New York', contactPerson: 'John Doe', contactEmail: 'john@example.com' },
    { id: 2, name: 'Downtown Campus', location: 'Los Angeles', contactPerson: 'Jane Smith', contactEmail: 'jane@example.com' },
  ])
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false)
  const [isEditBranchModalOpen, setIsEditBranchModalOpen] = useState(false)
  const [newBranch, setNewBranch] = useState({ name: '', location: '', contactPerson: '', contactEmail: '' })
  const [editingBranch, setEditingBranch] = useState(null)

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.location && newBranch.contactPerson && newBranch.contactEmail) {
      setBranches([...branches, { ...newBranch, id: branches.length + 1 }])
      setIsAddBranchModalOpen(false)
      setNewBranch({ name: '', location: '', contactPerson: '', contactEmail: '' })
    }
  }

  const handleEditBranch = (branch) => {
    setEditingBranch(branch)
    setIsEditBranchModalOpen(true)
  }

  const handleUpdateBranch = () => {
    if (editingBranch.name && editingBranch.location && editingBranch.contactPerson && editingBranch.contactEmail) {
      setBranches(branches.map(b => b.id === editingBranch.id ? editingBranch : b))
      setIsEditBranchModalOpen(false)
      setEditingBranch(null)
    }
  }

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter(b => b.id !== id))
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Branch Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddBranchModalOpen(true)}
        >
          Add Branch
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Contact Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id} hover>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.location}</TableCell>
                <TableCell>{branch.contactPerson}</TableCell>
                <TableCell>{branch.contactEmail}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditBranch(branch)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteBranch(branch.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddBranchModalOpen} 
        onClose={() => setIsAddBranchModalOpen(false)}
      >
        <DialogTitle>Add New Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={newBranch.name}
            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={newBranch.location}
            onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Person"
            fullWidth
            value={newBranch.contactPerson}
            onChange={(e) => setNewBranch({ ...newBranch, contactPerson: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Email"
            type="email"
            fullWidth
            value={newBranch.contactEmail}
            onChange={(e) => setNewBranch({ ...newBranch, contactEmail: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBranch} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditBranchModalOpen} 
        onClose={() => setIsEditBranchModalOpen(false)}
      >
        <DialogTitle>Edit Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={editingBranch?.name || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={editingBranch?.location || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, location: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Person"
            fullWidth
            value={editingBranch?.contactPerson || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, contactPerson: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Email"
            type="email"
            fullWidth
            value={editingBranch?.contactEmail || ''}
            onChange={(e) => setEditingBranch({ ...editingBranch, contactEmail: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditBranchModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateBranch} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

