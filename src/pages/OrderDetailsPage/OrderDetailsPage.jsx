import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleSubmit = () => {
  // логіка замовлення...
  navigate('/order');
};
