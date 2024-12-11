// import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const BackBtn = ({...others }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Navigate to previous page">
      <Button
        icon={ <LeftOutlined /> }
        onClick={() => navigate('/')}
        {...others}
      >
        {'Trở lại trang chủ'}
      </Button>
    </Tooltip>
  );
};