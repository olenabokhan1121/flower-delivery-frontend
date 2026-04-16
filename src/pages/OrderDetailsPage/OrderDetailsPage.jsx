import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import css from './OrderDetailsPage.module.css';

export default function OrderCart() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      toast.success('Order successfully placed! 🎉', {
        id: 'order-success', //прибираю повторний тост
      });
    }
  }, [location.state]);
  return (
    /*
    <div className={css.pageWrapper}>
      <div className={css.card}>*/
    <h2 className={css.title}>✨Thank you for your order!!!✨</h2>
  );
}
