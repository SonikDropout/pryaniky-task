export default (products, order, orderBy) => {
  // in case there is nothing to sort
  if (!products.length) return products

  const orderByType = typeof (products[0][orderBy])
  if (orderByType === 'string') {
    return products.sort((a, b) => (
      order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : - a[orderBy].localeCompare(b[orderBy])
    ))
  } else if (orderByType === 'number') {
    return products.sort((a, b) => (
      order === 'asc'
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy]
    ))
  }
}