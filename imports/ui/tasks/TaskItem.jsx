import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ListItem, 
  Flex, 
  Spacer, 
  Checkbox, 
  Button, 
  HStack
} from '@chakra-ui/react';

export const TaskItem = ({ task, onCheckboxClick, onDeleteClick }) => {

  const [checked, setChecked] = React.useState(!!task.isChecked);

  task.taskId = task._id;
  
  return (
    <ListItem>
      <Flex>
        <HStack>
          <Checkbox
            isChecked={checked}
            onChange={()=>{
              setChecked(!checked);
              return onCheckboxClick(task);
            }}
          />
          <Link to={`${task._id}`} >{task.text}</Link>
          {/* <Link href={`tasks/${task._id}`} >{task.text}</Link> */}
        </HStack>
        <Spacer />
        <HStack> 
        <span>@{task.user?.username}</span>
        <Button onClick={() => onDeleteClick(task)}>&times;</Button>
        </HStack>
      </Flex>
    </ListItem>
  );
};
