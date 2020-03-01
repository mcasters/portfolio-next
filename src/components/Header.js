import Link from 'next/link';
import { withApollo } from '../data/client';
import LoginToggle from "./loginToggle";

const linkStyle = {
  marginRight: 15,
};

const Header = () => {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/presentation">
        <a style={linkStyle}>About</a>
      </Link>
      <Link href="/page">
        <a style={linkStyle}>Page</a>
      </Link>
      <Link href="/sculpture">
        <a style={linkStyle}>Sculpture</a>
      </Link>
      <Link href="/dessins">
        <a style={linkStyle}>Dessins</a>
      </Link>
      <LoginToggle/>
    </div>
  );
};

export default withApollo(Header);
