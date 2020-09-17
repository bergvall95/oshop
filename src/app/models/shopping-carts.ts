import { ProductId } from './product';

export class CartItem {
    constructor(public product: ProductId, public quantity: number){}

    get totalPrice(): number { return (this.product.price * this.quantity); }
}

export class ShoppingCartId{
    items: CartItem[] = [];
    constructor(public itemsMap: {[productId: string]: CartItem}){
        for ( let productId in itemsMap){
            let item = itemsMap[productId];
            this.items.push( new CartItem(item.product, item.quantity));
        }
    }

    getQuantity(product:ProductId){
        let item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
    }
    get totalItemsCount(): number {
        let count = 0;
        for ( let productId in this.itemsMap){
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
    get totalPrice(): number{
        let sum = 0;
        for(let productId of this.items){
            sum += productId.totalPrice;
        }
        return sum;
    }
}
