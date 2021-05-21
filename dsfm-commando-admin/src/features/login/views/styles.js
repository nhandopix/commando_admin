import styled from 'styled-components';

const LoginWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: ${props => props.theme.palette.background[0]};

  .loginContentWrapper {
    width: 500px;
    overflow-y: auto;
    z-index: 10;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 5px 7px 0px rgba(0,0,0,0.4);
  }

  .loginContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 70px 50px;
    position: relative;
    background-color: ${props => props.theme.palette.background[1]};

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }
  }

  .logoWrapper {
    width: 100%;
    display: flex;
    margin-bottom: 50px;
    justify-content: center;
    flex-shrink: 0;
  }

  .loginForm {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;

      .ant-row.ant-form-item {
        margin-bottom: 15px;
      }
      .ant-input.ant-input-lg {
        height: 42px;
        font-size: 14px;
      }
  }

  .loginHelperWrapper {
    margin-top: 30px;
    text-align: center;
    
    .loginHelperText {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2;
      padding-left: 15px;
      position: relative;
      display: inline-block;

      &:before {
        content: '*';
        color: ${props => props.theme.palette.error[0]};
        padding-right: 3px;
        font-size: 14px;
        line-height: 1;
        position: absolute;
        top: 2px;
        left: 0;
      }
    }
  }

`;

export {
  LoginWrapper
}