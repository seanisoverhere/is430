import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";
import { Invoice } from "@/types/invoice";

const useInvoice = () => {
  const [invoices, setInvoices] = useState<Array<Invoice>>();
  const [invoiceDetails, setInvoiceDetails] = useState<Invoice>();

  const getAllInvoices = async (uuid: number) => {
    const response: ApiResponse<any> = await xbbApi.getAllInvoice(uuid);
    if (response.ok) {
      setInvoices(response.data.invoice);
    }
    return response;
  };

  const getSingleInvoice = async (invoiceId: number) => {
    const response: ApiResponse<any> = await xbbApi.getSingleInvoice(invoiceId);
    if (response.ok) {
      setInvoiceDetails(response.data);
    }
    return response;
  };

  return {
    invoices,
    getAllInvoices,
    invoiceDetails,
    getSingleInvoice,
  };
};

export default useInvoice;
