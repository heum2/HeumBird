import styled from 'styled-components';

export const ProfileHeader = styled.div`
  flex-direction: row;
  margin: 32px 0 0;
  justify-content: flex-start;
  display: flex;
`;

export const ImgContent = styled.div`
  margin: 2px 32px 0 124px;
  .btn {
    display: inline-block;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
  }

  .btn:focus {
    outline: none;
  }

  img {
    border-radius: 50%;
    width: 38px;
    height: 38px;
  }
`;

export const NicknameContent = styled.div`
  flex: 0 1 auto;
  margin-right: 20px;
  overflow-x: hidden;
  display: flex;

  h1 {
    font-size: 24px;
    font-weight: 400;
    line-height: 38px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const Row = styled.div`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: flex-start;
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  position: relative;
`;

export const Aside = styled.aside`
  padding-left: 32px;
  padding-right: 32px;
  text-align: right;
  flex: 0 0 194px;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  margin-top: 6px;
  color: rgba(var(--i1d, 38, 38, 38), 1);
`;

export const InputSide = styled.div`
  flex-basis: 355px;
  flex-direction: row;
  padding-right: 8rem;
  flex-grow: 1;
  font-size: 16px;
  justify-content: flex-start;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  display: flex;
`;
