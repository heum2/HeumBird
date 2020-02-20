import styled from 'styled-components';

export const Container = styled.div`
  white-space: nowrap;
  overflow-x: auto;

  .content {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    display: inline-block;
    padding: 8px;
    margin: 6px;
    position: relative;
  }

  .image {
    float: left;
    width: auto;
    height: auto;
    max-width: 208px;
    max-height: 208px;
  }

  .hover {
    float: left;
    width: auto;
    height: auto;
    max-width: 208px;
    max-height: 208px;
    filter: brightness(0.3);
    -webkit-filter: brightness(0.3);
  }
`;
