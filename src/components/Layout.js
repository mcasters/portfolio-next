import Header from './Header';
import React from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <style jsx>{`
      header {
        background-color: grey;
      }
    `}</style>
  </div>
);

export default Layout;
