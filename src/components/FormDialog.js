import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { JsonForms } from '@jsonforms/react';
import { addProduct, updateProduct } from '../store/actions/productsActions'
import { Actions } from '@jsonforms/core';
import { initData } from '../JSONforms/init'


function FormDialog(props) {
  const {
    isOpen,
    products,
    closeDialog,
    editedProductId,
    addProduct,
    updateProduct,
    formData,
    resetFormData,
    setEditedProduct
  } = props

  useEffect(() => {
    const editedProduct = products.find(product => product._id === editedProductId)
    setEditedProduct(editedProduct)
  }, [editedProductId])

  const createProduct = () => {
    addProduct(formData)
    resetFormData()
  }

  const saveProductChanges = () => {
    updateProduct(editedProductId, formData)
  }
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {
            editedProductId
              ? 'Edit product info'
              : 'Enter product info'
          }
        </DialogTitle>
        <DialogContent>
          <JsonForms />
        </DialogContent>
        <DialogActions>
          {
            editedProductId ?
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
  editedProductId: state.editedProductId,
  formData: state.jsonforms.core.data,
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_DIALOG' }),
  updateProduct: (id, product) => dispatch(updateProduct(id, product)),
  addProduct: (product) => dispatch(addProduct(product)),
  resetFormData: () => dispatch(Actions.update('', () => initData)),
  setEditedProduct: (product) => dispatch(Actions.update('', () => product)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
