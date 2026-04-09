import css from './ShoppingCartPage.module.css';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import yupPhone from 'yup-phone';
import { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../utils';
//import loading from '../../components/Loading/Loading';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../redux/cart/slice';
//yupPhone(Yup);
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
    //.phone('UA', true, 'Not valid number!')
    .matches(/^(\+380|0)\d{9}$/, 'Invalid phone number!')
    .required('This field is required'),
  userAddress: Yup.string().required('This field is required'),
});

export default function ShoppingCart() {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const phoneFieldId = useId();
  const addressFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorId, setErrorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const cart = useSelector(state => state.cart.items);
  const handleUpdateQuantity = (id, count) => {
    if (count === 0) {
      dispatch(removeFromCart(id));
      return;
    }
    dispatch(updateQuantity({ id, count }));
  };

  const handleRemoveItem = id => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const handleSubmit = async (values, actions) => {
    const order = {
      ...values,
      items: cart,
      totalPrice,
      createdAt: new Date().toISOString(), // timezone-safe
    };

    await addOrder(order);
    //toast.success('Order successfully placed! 🎉');
    dispatch(clearCart());
    actions.resetForm();
    navigate('/order', { state: { success: true } });
  };

  return (
    <div className={css.pageWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={CartSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <div className={clsx(css.user, css.form_input)}>
              <Form id="order-form">
                <label htmlFor={nameFieldId} className={css.label}>
                  Name:
                </label>
                <Field
                  type="text"
                  name="userName"
                  id={nameFieldId}
                  className={css.input}
                  placeholder="Name"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className={css.error}
                />
                <label htmlFor={emailFieldId} className={css.label}>
                  Email:
                </label>
                <Field
                  type="email"
                  name="userEmail"
                  id={emailFieldId}
                  className={css.input}
                  placeholder="email@gmail.com"
                />
                <ErrorMessage
                  name="userEmail"
                  component="div"
                  className={css.error}
                />
                <label htmlFor={phoneFieldId} className={css.label}>
                  Phone:
                </label>
                <Field
                  type="text"
                  name="userPhone"
                  id={phoneFieldId}
                  className={css.input}
                  placeholder="Phone"
                />
                <ErrorMessage
                  name="userPhone"
                  component="div"
                  className={css.error}
                />
                <label htmlFor={addressFieldId} className={css.label}>
                  Address:
                </label>
                <Field
                  type="text"
                  name="userAddress"
                  id={addressFieldId}
                  className={css.input}
                  placeholder="Address"
                />
                <ErrorMessage
                  name="userAddress"
                  component="div"
                  className={css.error}
                />
              </Form>
            </div>
            <div className={clsx(css.user, css.form_cart)}>
              <div className={css.scrollWrap}>
                {cart.map(item => (
                  <div key={item._id} className={css.item_wrap}>
                    <h4 className={css.itemName}>{item.name}</h4>
                    <p className={css.itemPrice}>{item.price}$</p>
                    <div className={css.flexWrap}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={css.imageCard}
                      />

                      <input
                        name="count"
                        className={css.count_input}
                        type="number"
                        value={item.count}
                        onChange={e => {
                          if (e.target.value === '') {
                            return;
                          }
                          const value = Number(e.target.value);

                          if (value > item.quantity) {
                            setErrorId(item._id);
                            return;
                          }
                          setErrorId(null);

                          handleUpdateQuantity(item._id, value);
                        }}
                      />
                      {errorId === item._id && (
                        <p className={css.error}>
                          The entered quantity exceeds the available quantity😢
                        </p>
                      )}
                      <button
                        className={css.removeBtn}
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={css.bottomRow}>
              <p className={css.totalPrice}>Total: {totalPrice}$</p>

              <button
                type="submit"
                form="order-form" // прив'язка зовнішньої кнопки до форми
                className={css.button}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
