import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    item_id: string;
    item_type: string;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => set((state) => {
                const existingItem = state.items.find(i => i.item_id === item.item_id);

                if (existingItem) {
                    return {
                        items: state.items.map(i =>
                            i.item_id === item.item_id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                    };
                }

                return {
                    items: [...state.items, { ...item, quantity: 1 }],
                };
            }),

            removeItem: (itemId) => set((state) => ({
                items: state.items.filter(i => i.item_id !== itemId),
            })),

            updateQuantity: (itemId, quantity) => set((state) => ({
                items: state.items.map(i =>
                    i.item_id === itemId ? { ...i, quantity } : i
                ),
            })),

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
