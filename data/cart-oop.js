function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if(!this.cartItems){
        this.cartItems = [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: 2
          }
        ];
      }
    },
  
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    addToCart(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: 1
        })
      }
    
      this.saveToLocalStorage();
    },
  
    removeFromCart(productId) {
      const newCart = this.cartItems.filter((item) => {
        return !(item.productId === productId);
      });
    
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },
    
    updateDeliveryOptionId(productId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToLocalStorage();
    }
  
  };
  return cart;
}

const newProductId = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

businessCart.addToCart(newProductId);

console.log(cart);
console.log(businessCart);