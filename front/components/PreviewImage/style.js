import styled from 'styled-components';

export const PreView = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${props => props.divTransfrom || 'translate(-90%, -50%)'};

  .ant-btn-link {
    color: #fafafa;
  }
`;
