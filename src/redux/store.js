import { configureStore } from '@reduxjs/toolkit';
//import filtersReducer from "./filters/slice";
//import { authReducer } from "./auth/slice";
//import { recipesReducer } from "./recipes/slice";
//import storage from 'redux-persist/lib/storage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

/*
 

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          values.ingredients = addedIngredients;
          handleSubmit(values, addedIngredients, actions);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={css.cont_form}>
              <div className={css.cont_img}>
                <h2 className={css.title}>Upload Photo</h2>
                <div
                  className={css.img_recipe}
                  onClick={handleImageClick}
                  style={{
                    backgroundImage: preview ? `url(${preview})` : "none",
                  }}
                >
                  {!preview && (
                    <svg className={css.icon_photo}>
                      <use href={`/svg/sprite.svg#icon-default_photo`} />
                    </svg>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>

              <div className={css.cont_for_pc}>
                <h2 className={css.title}>General Information</h2>

                <label className={css.label} htmlFor="nameRecipe">
                  Recipe Title
                  <Field
                    className={css.field}
                    id="nameRecipe"
                    name="nameRecipe"
                    type="text"
                    placeholder="Enter the name of your recipe"
                  />
                  <ErrorMessage
                    className={css.error}
                    name="nameRecipe"
                    component="span"
                  ></ErrorMessage>
                </label>

                <label className={css.label} htmlFor="recipeDescription">
                  Recipe Description
                  <Field
                    className={css.field_textarea}
                    id="recipeDescription"
                    name="recipeDescription"
                    as="textarea"
                    placeholder="Enter a brief description of your recipe"
                  />
                  <ErrorMessage
                    className={css.error}
                    name="recipeDescription"
                    component="span"
                  ></ErrorMessage>
                </label>

                <label className={css.label} htmlFor="cookingTime">
                  Cooking time in minutes
                  <div className={css.selectWrapper}>
                  <Field
                    className={css.field}
                    id="cookingTime"
                    name="cookingTime"
                    type="number"
                    min="0"
                    placeholder="10"
                  />
                   <svg className={css.select_up_down}>
                        <use href={`/svg/sprite.svg#icon-up-down`} />
                    </svg>
                   </div>
                  <ErrorMessage
                    className={css.error}
                    name="cookingTime"
                    component="span"
                  ></ErrorMessage>
                </label>

                <div className={css.cal_cat}>
                  <label className={css.label} htmlFor="calories">
                    Calories
                    <div className={css.selectWrapper}>
                    <Field
                      className={css.field}
                      id="calories"
                      name="calories"
                      type="number"
                      min="0"
                      placeholder="150 cals"
                      />
                    <svg className={css.select_up_down}>
                        <use href={`/svg/sprite.svg#icon-up-down`} />
                    </svg>
                    </div>
                    <ErrorMessage
                      className={css.error}
                      name="calories"
                      component="span"
                    ></ErrorMessage>
                  </label>

                  <label className={css.label} htmlFor="recipeCategory">
                    Category
                    <div className={css.selectWrapper}>
                      <Field
                        className={`${css.field}`}
                        as="select"
                        id="recipeCategory"
                        name="recipeCategory"
                      >
                        <option value="" disabled hidden>
                          {categories[0]?.name || "Select category"}
                        </option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </Field>

                      <svg className={css.selectArrow}>
                        <use href={`/svg/sprite.svg#icon-select_arrow`} />
                      </svg>
                    </div>
                    <ErrorMessage
                      className={css.error}
                      name="recipeCategory"
                      component="span"
                    ></ErrorMessage>
                  </label>
                </div>

                <h2 className={css.title}>Ingredients</h2>

                <div className={css.cont_ingred}>
                  <label
                    className={clsx(css.label, css.label_name)}
                    htmlFor="name_ingredients"
                  >
                    Name
                    <div className={css.selectWrapper}>
                      <Field
                        className={css.field}
                        as="select"
                        id="name_ingredients"
                        name="name_ingredients"
                      >
                        <option value="" disabled hidden>
                          {ingredients[0]?.name || "Select ingredient"}
                        </option>
                        {ingredients.map((ing) => (
                          <option key={ing._id} value={ing._id}>
                            {ing.name}
                          </option>
                        ))}
                      </Field>

                      <svg className={css.selectArrow}>
                        <use href={`/svg/sprite.svg#icon-select_arrow`} />
                      </svg>
                    </div>
                  </label>

                  <label
                    className={clsx(css.label, css.label_amount)}
                    htmlFor="amount_ingredients"
                  >
                    Amount
                    <Field
                      className={css.field}
                      id="amount_ingredients"
                      name="amount_ingredients"
                      placeholder="100g"
                    />
                    <ErrorMessage
                      className={css.error}
                      name="ingredients"
                      component="span"
                    ></ErrorMessage>
                  </label>
                  
                </div>
                

                <div className={css.btn_cont}>
                  {addedIngredients.length > 0 && (
                    <button
                      type="button"
                      className={css.btn_remove}
                      onClick={handleRemoveLastIngredient}
                    >
                      Remove last Ingredient
                    </button>
                  )}
                </div>

                <div className={css.btn_cont}>
                  <button
                    type="button"
                    className={css.btn_add}
                    onClick={() => handleAddIngridient(values, setFieldValue)}
                  >
                    Add new Ingredient
                  </button>
                </div>

                {addedIngredients.length > 0 && (
                  <div className={css.cont_ing}>
                    <div className={css.cont_select_ing}>
                      <p className={css.ing}>Name:</p>
                      <p className={css.ing}>Amount:</p>
                    </div>
                    <ul>
                      {addedIngredients.map((ing, index) => {
                        const fullIngredient = ingredients.find(
                          (i) => i._id === ing.id
                        );
                        return (
                          <li
                            className={css.ing_list}
                            key={ing.id + ing.measure}
                          >
                            <p className={css.ing_sel}>
                              {fullIngredient?.name || "Unknown"}
                            </p>
                            <p className={css.ing_sel}>{ing.measure}</p>
                            <button
                              type="button"
                              className={css.icon_btn}
                              onClick={() => handleRemoveIng(index)}
                            >
                              <svg className={css.icon_delete}>
                                <use href={`/svg/sprite.svg#icon-delete`} />
                              </svg>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <h2 className={css.title}>Instructions</h2>

                <Field
                  className={css.field_textarea}
                  as="textarea"
                  name="instructions"
                  placeholder="Enter a text"
                />
                <ErrorMessage
                  className={css.error}
                  name="instructions"
                  component="span"
                ></ErrorMessage>
              </div>

              <div className={css.cont_push_btn}>
                <button type="submit" className={css.btn_submit}>
                  Publish Recipe
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {showModal && (
        <SuccessSaveModal
          isOpen={showModal}
          recipeId={createdRecipeId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}*/
