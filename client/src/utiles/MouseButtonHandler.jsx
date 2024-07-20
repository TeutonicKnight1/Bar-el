import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MouseButtonHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseButton = (event) => {
      if (event.button === 4) {
        console.log('Back button clicked');
        navigate(-1);
      } else if (event.button === 5) {
        // Действие при нажатии кнопки "Вперед"
        console.log('Forward button clicked');
        navigate(1);
      }
    };

    window.addEventListener('mouseup', handleMouseButton);

    return () => {
      window.removeEventListener('mouseup', handleMouseButton);
    };
  }, [navigate]);

  return (
    <></>
  );
};

export default MouseButtonHandler;
