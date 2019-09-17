  
import { createStore } from 'redux'
import { redacktReducer } from './store/reducer';

// const store = createStore(
//     redacktReducer, /* preloadedState, */
//  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
export default createStore(redacktReducer);
// export default store;