import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'
import { JsonForms } from '@jsonforms/react';
import { addProduct, updateProduct } from '../store/actions/productsActions'
import { Actions } from '@jsonforms/core';
import { initData } from '../JSONforms/init'

const styles = {
  dialogContent: {
    overflowX: 'hidden',
  },
};

function FormDialog(props) {
  const {
    isOpen,
    products,
    closeDialog,
    editedProductId, unsetEditedProduct,
    addProduct,
    updateProduct,
    formData,
    setFormData,
    classes,
  } = props

  useEffect(() => {
    const editedProduct = products.find(product => product._id === editedProductId)
    setFormData(editedProduct)
  }, [editedProductId])

  const createProduct = () => {
    addProduct(formData)
    setFormData(initData)
  }

  const saveProductChanges = () => {
    updateProduct(editedProductId, formData)
  }

  const handleCloseDialog = () => {
    if (editedProductId) {
      unsetEditedProduct()
      closeDialog()
      setFormData(initData)
    } else {
      closeDialog()
    }
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {
            editedProductId
              ? 'Edit product info'
              : 'Enter product info'
          }
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


FormDialog.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string
  }).isRequired).isRequired,
  editedProductId: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  unsetEditedProduct: PropTypes.func.isRequired,
};

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
  setFormData: (data) => dispatch(Actions.update('', () => data)),
  unsetEditedProduct: () => dispatch({ type: 'EDIT_PRODUCT_CANCEL' })
})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FormDialog))
