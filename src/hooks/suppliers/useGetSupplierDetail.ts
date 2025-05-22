import { suppliers } from "@/data/suppliers";

const useGetSupplierDetail = (supplierId: string) => {
  const result = suppliers?.filter(
    (supplier) => Number(supplier.id) === Number(supplierId)
  )[0];

  return result;
};

export default useGetSupplierDetail;
