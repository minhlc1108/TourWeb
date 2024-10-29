import { Result } from 'antd';
import { BackBtn } from '~/components/BackBtn';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang bạn tìm không tồn tại"
      extra={<BackBtn type="primary" />}
    />
  );
};

export default NotFound