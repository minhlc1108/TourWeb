import { Result } from 'antd';
import { BackBtn } from '~/components/BackBtn';

const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập trang này"
      extra={<BackBtn type="primary" />}
    />
  );
};

export default Forbidden