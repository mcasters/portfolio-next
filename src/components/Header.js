import Link from 'next/link';
import { withApollo } from '../data/client';
import LoginToggle from './LayoutComponents/Footer/loginToggle';

const linkStyle = {
  marginRight: 15,
};

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/presentation">
        <a style={linkStyle}>About</a>
      </Link>
      <Link href="/testOtherAPI">
        <a style={linkStyle}>TestOtherAPI</a>
      </Link>
      <Link href="/page">
        <a style={linkStyle}>Page</a>
      </Link>
      <Link href="/peintures">
        <a style={linkStyle}>Peintures</a>
      </Link>
      <Link href="/sculptures">
        <a style={linkStyle}>Sculptures</a>
      </Link>
      <Link href="/dessins">
        <a style={linkStyle}>Dessins</a>
      </Link>
      <LoginToggle />
    </header>
  );
};

export default withApollo(Header);
