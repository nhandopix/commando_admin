import styled from 'styled-components';

const TopbarDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: -12px -16px;
  width: 360px;
  min-width: 160px;
  flex-shrink: 0;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
  cursor: pointer;
  @media only screen and (max-width: 767px) {
    width: 310px;
  }


  &.isoUserDropdown {
    padding: 7px 0;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    width: 220px;
    min-width: 160px;
    flex-shrink: 0;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;

    .isoDropdownLink {
      font-size: 13px;
      color: #595959;
      line-height: 1.1;
      padding: 7px 15px;
      background-color: transparent;
      text-decoration: none;
      display: flex;
      justify-content: flex-start;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;

      &:hover {
        background-color: #f5f6f8;
      }
    }
  }
`;

export default TopbarDropdownWrapper;
