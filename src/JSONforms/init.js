import { materialFields, materialRenderers } from '@jsonforms/material-renderers';

export const initData = {
  id: 0,
  name: '',
  price: 0,
  description: '',
};

export const initState = {
  jsonforms: {
    fields: materialFields,
    renderers: materialRenderers
  },
};