import styled from 'styled-components';

const TopbarWrapper = styled.div`
  .topbarBlock {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 31px 0 265px;
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;

    @media only screen and (max-width: 767px) {
      padding: 0px 15px 0px 260px !important;
    }

    &.collapsed {
      padding: 0 31px 0 109px;
      @media only screen and (max-width: 767px) {
        padding: 0px 15px !important;
      }
    }
  }

  .blockLeft {
    display: flex;
    align-items: center;

    @media only screen and (max-width: 767px) {
      margin: 0 20px 0 0;
    }

    .triggerBtn {
      width: 24px;
      height: 100%;
      display: -webkit-inline-flex;
      display: -ms-inline-flex;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 0;
      outline: 0;
      position: relative;
      cursor: pointer;

      &:before {
        content: '\f20e';
        font-family: 'Ionicons';
        font-size: 26px;
        color: inherit;
        line-height: 0;
        position: absolute;
      }
    }
  }

  .blockRight {
    display: flex;
    align-items: center;

    li {
      margin-left: 0;
      margin-right: 35px;
      cursor: pointer;
      line-height: normal;
      position: relative;
      display: inline-block;

      @media only screen and (max-width: 360px) {
        margin-left: 0;
        margin-right: 25px;
      }

      &:last-child {
        margin: 0;
      }

      &.isoUser {
        .isoImgWrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: #fbfbfb;
          border-radius: 50%;

          img {
            height: 100%;
            object-fit: cover;
          }

          .userActivity {
            width: 10px;
            height: 10px;
            display: block;
            background-color: #7ED321;
            position: absolute;
            bottom: 0;
            right: 3px;
            border: 1px solid #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;

export {
  TopbarWrapper
};
