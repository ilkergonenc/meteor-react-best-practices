import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import { 
  Flex,
  Box,
  Spacer,
  Heading
} from '@chakra-ui/react';

import { useAuth } from '../auth/@/AuthProvider';

export const Navigation = () => {

  return (
    <Flex>
      <Heading>B2A</Heading>
      <Spacer />
      <Box p='4'>
        <Link to='/'>Welcome</Link>
      </Box>
      <Spacer />
      <Box p='4'>
        <Link to='tasks'>Tasks</Link>
      </Box>
      <Spacer />
      <Box p='4'>
        <Link to='404'>NotFound</Link>
      </Box>
      <Spacer />
      <Box p='4'>
        <AuthLink />
      </Box>
    </Flex>
  );
};


function AuthLink() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <Link to='signin'>Signin</Link>;
  }

  return (
      <a
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </a>
  );
};