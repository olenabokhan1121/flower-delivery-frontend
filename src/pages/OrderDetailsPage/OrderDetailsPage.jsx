import { useLocation } from "react-router-dom";
export default function shoppingCart() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      toast.success('Order successfully placed! 🎉');
    }
  }, [location.state]);
  return (
    /*
    <div className={css.pageWrapper}>
      <div className={css.card}>*/
    <h2 className={css.title}>order</h2>
  );
}
