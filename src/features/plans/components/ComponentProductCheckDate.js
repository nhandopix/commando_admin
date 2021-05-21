import React, { Fragment } from 'react';
import ComponentRender from './ComponentRender';

export default function ComponentProductCheckDate({ inputs, form, images }) {
  return (
    <Fragment>
      {
        inputs.map((item) => <ComponentRender key={item.component_code} {...item} form={form} images={images} />)
      }
    </Fragment>
  );
}