import { suppliers } from '@/data/suppliers';
import { create } from 'zustand';

export type Supplier = {
    id: number;
    name: string;
    category: string;
    description: string;
    rating: number;
    image: string;
    website: string;
    requestInfoEmail: string;
    location: string;
    services: string[];
};

type SupplierState = {
    suppliers: Supplier[];
    addSupplier: (supplier: Supplier) => void;
    updateSupplier: (updated: Supplier) => void;
    removeSupplier: (id: number) => void;
};

export const useSupplierStore = create<SupplierState>((set) => ({
    suppliers: suppliers,
    addSupplier: (supplier) =>
        set((state) => ({
            suppliers: [supplier, ...state.suppliers],
        })),
    updateSupplier: (updated) =>
        set((state) => ({
            suppliers: state.suppliers.map((s) =>
                s.id === updated.id ? updated : s
            ),
        })),
    removeSupplier: (id) =>
        set((state) => ({
            suppliers: state.suppliers.filter((s) => s.id !== id),
        })),
}));
