import Link from 'next/link';

const linkStyle = {
  marginLeft: 15
};

const NavBar = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default NavBar;