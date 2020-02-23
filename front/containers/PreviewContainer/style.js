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
    width: 208px;
    height: 208px;
    object-fit: contain;
  }

  .hover {
    float: left;
    width: 208px;
    height: 208px;
    object-fit: contain;
    filter: brightness(0.3);
    -webkit-filter: brightness(0.3);
  }
`;
