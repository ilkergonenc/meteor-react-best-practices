import {createQuery} from 'meteor/cultofcoders:grapher';

export default createQuery({
  tasks: {
    $filter({filters, params}) {
      if(params.taskId)     filters._id = params.taskId
      if(params.userId)     filters.userId = params.userId
      if(params.isChecked)  filters.isChecked = params.isChecked
    },
    $options: { sort: { createdAt: -1 } },
    text: 1, 
    isChecked: 1,
    user: {
      username: 1
    }
  }
});
