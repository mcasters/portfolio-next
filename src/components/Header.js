import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
};

const Header = () => (
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
      <a style={linkStyle}>Peintures</a>
    </Link>
    <Link href="/login">
      <a style={linkStyle}>Login</a>
    </Link>
  </div>
);

export default Header;
