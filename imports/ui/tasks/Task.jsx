import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Box, Button } from '@chakra-ui/react';

export const Task = () => {
  const task = useOutletContext();
  const nav = useNavigate();
  return (
    <Box>
      <Button 
        mt={4} 
        colorScheme='teal' 
        type='button' 
        onClick={()=>nav('edit')}
      >
        Edit task
      </Button>

      <br />
      Task: {task?.text}<br />
      Status: {task?.isChecked ? 'Done' : 'Not Done'}<br />
      {/* {task?.userId}<br /> */}
      User:@{task?.user?.username}<br />
    </Box>
  );
};
