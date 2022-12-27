import axios from 'axios';
import { useRequest } from '../TS/interfaces';
import { useState } from 'react';

const DoRequest = ({ url, method, body, onSuccess }: useRequest) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      setErrors(err.response.data.errors.map((err: any) => err.message));
    }
  };

  return { doRequest, errors };
};

export default DoRequest;
