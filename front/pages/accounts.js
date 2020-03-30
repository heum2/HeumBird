import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Main, Side, Article } from '../styled/accouts';
import Edit from '../containers/Account/edit';
import Password from '../containers/Account/password';

const Accounts = () => {
  const [StyleChange, setStyleChange] = useState(true);
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const handleEdit = useCallback(e => {
    setStyleChange(true);
  }, []);

  const handlePassword = useCallback(e => {
    setStyleChange(false);
  }, []);

  return (
    <>
      <Head>
        <title>프로필 편집 • HeumBird</title>
        <meta name="description" content="여기를 눌러 링크를 확인하세요" />
        <meta name="og:title" content="로그인 • HeumBird" />
        <meta name="og:description" content="여기를 눌러 링크를 확인하세요" />
        <meta property="og:type" content="website" />
      </Head>
      <Main>
        <Side>
          <li>
            <a onClick={handleEdit} className={StyleChange ? 'HRM' : ''}>
              프로필 편집
            </a>
          </li>
          <li>
            <a onClick={handlePassword} className={!StyleChange ? 'HRM' : ''}>
              비밀번호 변경
            </a>
          </li>
        </Side>
        <Article>{StyleChange ? <Edit /> : <Password />}</Article>
      </Main>
    </>
  );
};

export default Accounts;
