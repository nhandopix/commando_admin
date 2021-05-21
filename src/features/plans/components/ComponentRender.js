import React, { Fragment } from 'react';
import ComponentText from './ComponentText';
import ComponentRadio from './ComponentRadio';
import ComponentSelect from './ComponentSelect';
import ComponentDatePicker from './ComponentDatePicker';
import ComponentCategoryCheckDate from './ComponentCategoryCheckDate';
import ComponentProductCheckDate from './ComponentProductCheckDate';
import ComponentButtonTakePicture from './ComponentButtonTakePicture';

function ComponentRender(props) {

  const renderComponent = () => {
    const { component_type } = props;

    switch (component_type) {

      case 'TEXT': {
        return <ComponentText {...props} />
      }

      case 'RADIO': {
        return <ComponentRadio {...props} />
      }

      case 'SELECT': {
        return <ComponentSelect {...props} />
      }

      case 'CATEGORY_CHECK_DATE': {
        return <ComponentCategoryCheckDate {...props} />
      }

      case 'PRODUCT_CHECK_DATE': {
        return <ComponentProductCheckDate {...props} />
      }

      case 'DATE_PICKER': {
        return <ComponentDatePicker {...props} />
      }

      // case 'BUTTON_TAKE_PICTURE': {
      //   return <ComponentButtonTakePicture {...props} />
      // }

      default:
        break;
    }
  }

  return (
    <Fragment>
      {renderComponent()}
    </Fragment>
  );
}

export default React.memo(ComponentRender)