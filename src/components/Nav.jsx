import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  const [backGroundColorShow, setBackGroundColorShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const searchInputChangeHandler = (event) => {
    setSearchValue(event.target.value);
    navigate(`/search?q=${event.target.value}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBackGroundColorShow(true);
      } else {
        setBackGroundColorShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavWrapper backGroundColorShow={backGroundColorShow}>
      <Logo>
        <img
          src='/images/logo.svg'
          alt='Disney Plus Logo'
          onClick={() => (window.location.href = '/')}
        />
      </Logo>
      {pathname === '/' ? (
        <Login>Login</Login>
      ) : (
        <Input
          className='nav__input'
          type='text'
          placeholder='검색 해주세요.'
          value={searchValue}
          onChange={searchInputChangeHandler}
        />
      )}
    </NavWrapper>
  );
};

export default Nav;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) =>
    props.backGroundColorShow ? '#090b13' : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
