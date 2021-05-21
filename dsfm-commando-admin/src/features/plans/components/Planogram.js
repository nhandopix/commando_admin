import React, { Fragment } from 'react';
import Groups from './Groups';

// issues.FACING.items.0.groups.0.skus.0.value;
export default function Planogram({ groups, path }) {
  return (
    <Fragment>
      {
        groups.map((group, index) => {
          return (
            <Groups path={`${path}.groups.${index}`} dataSource={group.skus} />
          );
        })
      }
    </Fragment>
  );
}
