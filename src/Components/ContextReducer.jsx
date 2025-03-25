import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const addIndex = state.findIndex(item => item.id === action.id);
            if (addIndex !== -1) {
                const updatedItem = { ...state[addIndex], quantity: state[addIndex].quantity + action.quantity };
                const updatedState = [...state];
                updatedState[addIndex] = updatedItem;
                return updatedState;
            } else {
                return [...state, { id: action.id, name: action.name, price: action.price, img: action.img, quantity: action.quantity }];
            }

        case "REMOVE":
            const removeIndex = state.findIndex(item => item.id === action.id);
            if (removeIndex !== -1) {
                if (state[removeIndex].quantity > 1) {
                    const updatedItem = { ...state[removeIndex], quantity: state[removeIndex].quantity - 1 };
                    const updatedState = [...state];
                    updatedState[removeIndex] = updatedItem;
                    return updatedState;
                } else {
                    return state.filter(item => item.id !== action.id);
                }
            }
            return state;


            case "DROP":
                // eslint-disable-next-line no-case-declarations
                let empArray=[];
                return empArray;

        default:
            console.log("Error");
            return state;
    }
};


// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartStateContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useDispatchCart = () => useContext(CartDispatchContext);
