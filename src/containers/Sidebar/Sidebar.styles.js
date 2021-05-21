import styled from 'styled-components';

const SidebarWrapper = styled.div`
  .isoSidebar {
    z-index: 1000;
    background: #2d3446;
    width: 280px;
    flex: 0 0 280px;

    .scrollarea {
      height: calc(100vh - 70px);
    }

    @media only screen and (max-width: 767px) {
      width: 240px !important;
      flex: 0 0 240px !important;
    }

    &.ant-layout-sider-collapsed {
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      height: 70px;
      background: #fff;
      margin: 0;
      padding: 10px 0;
      text-align: center;
      overflow: hidden;
      border-radius: 0;
      
      .img {
        max-height: 100%;
        width: auto;  
      }
    }

    .isoDashboardMenu {
      padding-top: 35px;
      padding-bottom: 35px;
      background: transparent;

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .ant-menu-item {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 24px;
        margin: 0;
      }

      .isoMenuHolder {
        display: flex;
        align-items: center;

        /* i {
          font-size: 19px;
          color: inherit;
          margin: 0 30px 0 0;
          width: 18px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        } */
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        &.icon {
          width: 18px;
          text-align: right;
        }
      }

      .nav-text {
        font-size: 14px;
        color: inherit;
        font-weight: 400;
        transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      }

      .ant-menu-item-selected {
        background-color: rgba(0, 0, 0, 0.4) !important;
        .anticon {
          color: #fff;
        }

        i {
          color: #fff;
        }

        .nav-text {
          color: #fff;
        }
      }

      > li {
        &:hover {
          i,
          .nav-text {
            color: #ffffff;
          }
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: #202739;
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          left: auto;
          right: 25px;

          &:before,
          &:after {
            width: 8px;
            transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }

          ${'' /* &:after {
            content: '\f123';
            font-family: 'Ionicons' !important;
            font-size: 16px;
            color: inherit;
            left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
            right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
            transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          } */};
        }

        &:hover {
          .ant-menu-submenu-arrow {
            &:before,
            &:after {
              color: #ffffff;
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          /* padding-left: 74px !important; */
          padding-right: 0px !important;
          /* font-size: 13px; */
          font-weight: 400;
          margin: 0;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

          &:hover {
            a {
              color: #ffffff !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline > {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export {
  SidebarWrapper
};
