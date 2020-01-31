import React from 'react';
import useForm from 'rc-form-hooks';
import { Form, Input } from 'antd';

const Main = () => {
  const { getFieldDecorator, validateFields, getFieldValue } = useForm();
  return (
    <div>
      <Form>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '이메일 형식을 입력해주세요!',
              },
              {
                required: true,
                message: '이메일을 입력해주세요!',
              },
            ],
          })(<Input placeholder="E-mail" />)}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Main;
