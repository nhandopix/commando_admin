import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const TitleHeader = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.palette.text[1]};
  display: block;
  text-transform: uppercase;
  line-height: 1.2;
  padding: 8px 0 8px 20px;
  position: relative;
  margin-bottom: 30px;

  &:before {
    content: '';
    width: 5px;
    background-color: ${props => props.theme.palette.text[1]};
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
`;

function TitlePage({ name = '', type = '' }) {
  return (
    <TitleHeader>
      <FormattedMessage
        id={`features.global.${type}-title`}
        defaultMessage="SMOLLAN"
        values={{ name }}
      />
    </TitleHeader>
  );
}

TitlePage.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

export default TitlePage;