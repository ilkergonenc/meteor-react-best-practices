import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react';

export default class FormControlValid extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <FormControl isInvalid={this.props.errors}>
        <FormLabel htmlFor={this.props.handle}>{this.props.label}</FormLabel>
        <Input
            id={this.props.handle}
            placeholder={this.props.placeholder ? this.props.placeholder : this.props.label}
            {...this.props.register(this.props.handle, this.props.rules)}
            type={this.props.type ? this.props.type : 'text'}
          />
        <FormErrorMessage>
          {this.props.errors && this.props.errors.message}
        </FormErrorMessage>
      </FormControl>
    );
  };
};
