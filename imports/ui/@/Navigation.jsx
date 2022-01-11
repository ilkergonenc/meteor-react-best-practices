import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  Flex,
  Box,
  Spacer,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Link as CLink
} from '@chakra-ui/react';

import { useAuth } from '../auth/@/AuthProvider';

export const Navigation = () => {

  return (
    <Flex align="center" py='4'>
      <Box>
        <Link to='/'>
          <Heading>B2A</Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <HStack>
          <Link to='tasks'>Tasks</Link>
          <Link to='tasks/query'>Query</Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
        <AuthMenu />
      </Box>
    </Flex>
  );
};

function AuthMenu() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user)
    return (
      <HStack>
        <Link to='login'>Log in</Link>
        <Spacer px='2' />
        <Button onClick={()=>navigate("join")}>Sign up</Button>
      </HStack>
    ); 

  return (
    <Menu>
      <MenuButton as={Button}>{auth.user}</MenuButton>
      <MenuList>
        <MenuItem onClick={()=>{auth.signout(()=>navigate("/"))}}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};