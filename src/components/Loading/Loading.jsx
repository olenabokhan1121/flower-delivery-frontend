import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <ClipLoader size={50} color="var(--button)" />
    </div>
  );
}
