import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { JsonForms } from '@jsonforms/react';


function FormDialog({ isOpen, closeDialog }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter product Info</DialogTitle>
        <DialogContent>
          <JsonForms />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Add product
            </Button>
          <Button onClick={closeDialog} color="primary">
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isOpen: state.isDialogOpen,
  products: state.products,
  editingProduct: state.editingProduct
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_DIALOG' }),
})


export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
