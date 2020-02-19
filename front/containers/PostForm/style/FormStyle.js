import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 0px -1px 60px;
  display: relative;
  width: 100%;
`;

export const ImageContainer = styled.div`
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

export const PreView = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${props => props.divTransfrom || 'translate(-90%, -50%)'};

  .ant-btn-link {
    color: #fafafa;
  }
`;
