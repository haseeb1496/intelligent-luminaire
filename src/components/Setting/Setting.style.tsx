import styled from "styled-components";

export const SettingContainer = styled.div`
  .heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-value {
      font-weight: bold;
      color: rgb(218 49 49);
      font-size: 1.1rem;
    }
    .heading {
      font-weight: 600;
    }
  }
  .MuiBox-root {
    width: 17rem;
    margin-left: 0.5rem;
  }
  .MuiSlider-mark,
  .MuiSlider-markLabel {
    display: none;
  }
  .MuiSlider-root {
    color: #e73c3c;
    margin: 0;
  }
`;
