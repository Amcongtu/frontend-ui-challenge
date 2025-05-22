import { useSupplierStore } from "@/stores/supplierStore";

const useGetSupplierDetail = (supplierId: string) => {
  const suppliers = useSupplierStore((state) => state.suppliers)

  const result = suppliers?.filter(
    (supplier) => Number(supplier.id) === Number(supplierId)
  )[0];

  return result;
};

export default useGetSupplierDetail;
