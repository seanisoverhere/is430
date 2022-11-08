import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

type Data = {
    data?: string;
    message: string;
    success: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        return await getSingleInvoice(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const getSingleInvoice = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const { invoiceId } = req.query

    const data = await prisma.invoice.findUnique({
        where: {
            invoiceId: String(invoiceId)
        },
    })

    return res.status(200).json({
        message: "Payment updated success",
        success: true,
        invoices: data,
    })
}