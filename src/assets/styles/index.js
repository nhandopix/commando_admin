import styled from 'styled-components';

const LayoutWrapper = styled.div`
  padding: 40px 20px;
  /* display: flex;
  flex-flow: row wrap; */
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: center;
`;

const TitleHeader = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.palette.text[1]};
  display: inline-block;
  text-transform: uppercase;
  line-height: 1.2;
  padding: 8px 0 8px 20px;
  position: relative;

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

const TitleBox = styled.h3`
  margin-bottom: 30px;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  background-color: ${props => props.theme.palette.background[2]};
  padding: 10px 15px;
`;

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: ${props => props.theme.palette.background[1]};
  border: 1px solid ${props => props.theme.palette.border[0]};
  margin: 0 0 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const formItemLayout = {
  labelCol: {
    md: { span: 6 },
    sm: { span: 24 }
  },
  wrapperCol: {
    md: { span: 10 },
    sm: { span: 24 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    md: { offset: 6 },
    sm: { offset: 0 }
  }
};

export {
  LayoutWrapper,
  TitleWrapper,
  TitleHeader,
  TitleBox,
  BoxWrapper,
  formItemLayout,
  tailFormItemLayout
}