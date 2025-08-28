import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer"; // Asegúrate de que rootReducer sea un objeto combinado
import cartReducer from "./slices/cartSlices"; // Asegúrate de que cartReducer esté importado correctamente
// Configuración de la tienda Redux
export const store = configureStore({
  reducer: rootReducer, // Pasa rootReducer como el valor de la propiedad "reducer"
  cart: cartReducer, // Asegúrate de que cartReducer esté importado correctamente
});

export default store;