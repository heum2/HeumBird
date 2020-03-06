import React, { useEffect } from 'react';
import Router from 'next/router';
import AppLayoutHeader from '../AppLayoutHeader';
import { Layout, ContentLayout, Container } from './style';
import { useSelector } from 'react-redux';
import Loading from '../Loading';

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <>
      {me ? (
        <Layout>
          <header id="myHeader" className="sticky">
            <AppLayoutHeader page={children.type.name} />
          </header>
          <Container>
            <ContentLayout>{children}</ContentLayout>
          </Container>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AppLayout;
