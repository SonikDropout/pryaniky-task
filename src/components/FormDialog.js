import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { JsonForms } from '@jsonforms/react';
import { addProduct, updateProduct } from '../store/actions/productsActions'


function FormDialog({ isOpen, closeDialog, editingProduct, addProduct, updateProduct, formData }) {
  const createProduct = () => {
    addProduct(formData)
  }

  const saveProductChanges = () => {
    updateProduct(editingProduct, formData)
  }
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
          {
            editingProduct ?
              (
                <Button onClick={saveProductChanges} color="primary">
                  Save changes
                </Button>
              ) : (
                <Button onClick={createProduct} color="primary">
                  Add product
                </Button>
              )
          }
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
  editingProduct: state.editingProduct,
  formData: state.jsonforms
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_DIALOG' }),
  updateProduct: (product) => dispatch(updateProduct(product)),
  addProduct: (product) => dispatch(addProduct(product))
})


export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
