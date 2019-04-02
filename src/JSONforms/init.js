import { materialFields, materialRenderers } from '@jsonforms/material-renderers';

export const initData = {
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