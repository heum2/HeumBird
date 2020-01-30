import React, { useCallback } from 'react';
import { Card, Form, Input } from 'antd';
import useForm from 'rc-form-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';

const SignUpForm = ({ setSignup }) => {
  const handleValuesChange = () => console.log('Value changes');
  const form = useForm({
    onValuesChange: handleValuesChange,
  });
  const { getFieldDecorator, validateFields } = form;
  const onBackButton = useCallback(() => {
    setSignup(false);
  }, []);
  const onSubmitForm = useCallback(e => {
    e.preventDefault();
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Card
      title="회원가입"
      extra={
        <FontAwesomeIcon
          icon={faCaretSquareLeft}
          size="2x"
          onClick={onBackButton}
          style={{ cursor: 'pointer' }}
        />
      }
    >
      <Form {...formItemLayout} onSubmit={onSubmitForm}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUpForm;
