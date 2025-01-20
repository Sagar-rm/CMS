import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export const FinancialManagement = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-06-01', description: 'Student Fee', amount: 1000, type: 'Income' },
    { id: 2, date: '2023-06-02', description: 'Staff Salary', amount: 5000, type: 'Expense' },
  ])
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false)
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({ date: '', description: '', amount: '', type: '' })
  const [editingTransaction, setEditingTransaction] = useState(null)

  const handleAddTransaction = () => {
    if (newTransaction.date && newTransaction.description && newTransaction.amount && newTransaction.type) {
      setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }])
      setIsAddTransactionModalOpen(false)
      setNewTransaction({ date: '', description: '', amount: '', type: '' })
    }
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setIsEditTransactionModalOpen(true)
  }

  const handleUpdateTransaction = () => {
    if (editingTransaction.date && editingTransaction.description && editingTransaction.amount && editingTransaction.type) {
      setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t))
      setIsEditTransactionModalOpen(false)
      setEditingTransaction(null)
    }
  }

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Financial Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<PlusCircle />}
          onClick={() => setIsAddTransactionModalOpen(true)}
        >
          Add Transaction
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} hover>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditTransaction(transaction)}><Edit /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTransaction(transaction.id)}><Trash2 /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isAddTransactionModalOpen} 
        onClose={() => setIsAddTransactionModalOpen(false)}
      >
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTransactionModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTransaction} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={isEditTransactionModalOpen} 
        onClose={() => setIsEditTransactionModalOpen(false)}
      >
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={editingTransaction?.date || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editingTransaction?.description || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={editingTransaction?.amount || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={editingTransaction?.type || ''}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditTransactionModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateTransaction} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

