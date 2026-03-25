import css from './ShoppingCartPage.module.css';
import 'yup-phone';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart, addOrder } from '../../utils';
const initialValues = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userAddress: '',
};
const CartSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Must be min 2 chars!')
    .max(50, 'Must be max 50 chars!')
    .required('This field is required'),
  userEmail: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  userPhone: Yup.string()
    .phone('UA', true, 'Not valid number!')
    .required('This field is required'),
  userAddress: Yup.string().required('This field is required'),
});

export default function shoppingCart() {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const phoneFieldId = useId();
  const addressFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);
  useEffect(() => {
    const updated = cart.map(item =>
      !item.count ? { ...item, count: 1 } : item
    );
    setCart(updated);
    saveCart(updated);
  }, []);
  const updateQuantity = (id, count) => {
    const updated = cart.map(item =>
      item._id === id ? { ...item, count } : item
    );
    setCart(updated);
    saveCart(updated);
  };

  const removeItem = id => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    saveCart(updated);
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleSubmit = async (values, actions) => {
    const order = {
      ...values,
      items: cart,
      totalPrice,
      createdAt: new Date().toISOString(), // timezone-safe
    };

    dispatch(addOrder(order));
    localStorage.removeItem('cart');
    setCart([]);
    actions.resetForm();
  };

  return (
    <div className={css.pageWrapper}>
      <div className={css.user - form_input}>
        <Formik
          initialValues={initialValues}
          validationSchema={CartSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <label htmlFor={nameFieldId} className={css.label}>
              Name:
            </label>
            <Field
              type="text"
              name="name"
              id={nameFieldId}
              className={css.input}
              placeholder="Name"
            />
            <ErrorMessage name="name" component="div" className={css.error} />
            <label htmlFor={emailFieldId} className={css.label}>
              Email:
            </label>
            <Field
              type="email"
              name="email"
              id={emailFieldId}
              className={css.input}
              placeholder="email@gmail.com"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
            <label htmlFor={phoneFieldId} className={css.label}>
              Phone:
            </label>
            <Field
              type="text"
              name="phone"
              id={phoneFieldId}
              className={css.input}
              placeholder="Phone"
            />
            <ErrorMessage name="phone" component="div" className={css.error} />
            <label htmlFor={addressFieldId} className={css.label}>
              Address:
            </label>
            <Field
              type="text"
              name="address"
              id={addressFieldId}
              className={css.input}
              placeholder="Address"
            />
            <ErrorMessage
              name="address"
              component="div"
              className={css.error}
            />
            <button
              type="submit"
              className={styles.button}
              onClick={() => navigate(`/order`)}
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <div className={css.user - form_cart}>
        {cart.map(item => (
          <div key={item._id}>
            <h4>{item.name}</h4>
            <p>{item.price} grn</p>

            <input
              type="number"
              value={item.count}
              onChange={e => updateQuantity(item._id, Number(e.target.value))}
            />

            <button onClick={() => removeItem(item._id)}>Remove</button>
          </div>
        ))}

        <h3>Total: {totalPrice}</h3>
      </div>
    </div>
  );
}
