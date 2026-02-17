import { useNavigate } from 'react-router-dom';

export function StartPage() {
  const navigate = useNavigate();

  return (
      <button
        onClick={async () => {
          navigate('/search', { state: { reset: true } });
        }}
      >
        예매 시작하기
      </button>
  );
}
