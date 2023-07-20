import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 1rem;
  .title {
    font-weight: bold;
    margin: 0 0 1rem 0;
  }
  .buttons-container {
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 0;
  }
  .toast-container {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AppButton = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? "#e73c3c" : "#eaeaea")};
  color: ${(props) => (props.primary ? "white" : "black")};
  padding: 0.75rem 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 0px 1px 0px,
    rgba(0, 0, 0, 0.23) 0px 6px 6px;
  margin: 0 1.5rem;
  cursor: pointer;
  width: 5rem;
  &:disabled {
    cursor: default;
    background: #cdcdcd;
    color: grey;
  }
`;
