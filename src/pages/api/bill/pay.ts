import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

type Data = {
    data?: string;
    message: string;
    success: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        return await pay(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const pay = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let { uuid, uenNo, repaymentPeriod, paymentAmt, invoiceId, payerAcctId } = req.body


    const repaymentPercent: any = {
        3: [0.4, 0.35, 0.25],
        6: [0.3, 0.2, 0.16, 0.14, 0.11, 0.09]
    }

    const companyUuid = await prisma.supplier.findFirst({
        where: {
            uenNo: uenNo,
        }
    })

    const invoice = await prisma.invoice.findUnique({
        where: {
            invoiceId: String(invoiceId)
        }
    })

    const currentDate = DateTime.local()

    const addStandingInstruction: any = await fetch("http://tbankonline.com/SMUtBank_API/Gateway", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'serviceName': 'addStandingInstruction',
            'userID': '',
            'PIN': '',
            'OTP': '999999',
            'accountFrom': String(invoice?.receiverAcctId),
            'accountTo': String(payerAcctId),
            'transactionAmount': String(paymentAmt[Number(repaymentPeriod)][0]),
            'transactionReferenceNumber': '123456',
            'nextDateTime': String((currentDate.plus({ month: 1 })).toJSDate()),
            'isRecurring': 'true',
            'weekly_monthly': 'Monthly',
            'narrative': 'Payment',
        },
        body: JSON.stringify({
            customerAccountID: payerAcctId,
            billingOrgAccountID: invoice?.receiverAcctId
        })
    })


    const data = await prisma.payment.create({
        data: {
            paymentId: String(addStandingInstruction.StandingInstructionID._content_),
            paymentDate: DateTime.local().toJSDate(),
            dueDate: (DateTime.local().plus({ month: repaymentPeriod })).toJSDate(),
            totalAmount: paymentAmt,
            paymentStatus: "IP",
            payerAcctId: payerAcctId,
            payer: {
                connectOrCreate: {
                    where: { uuid: Number(uuid) },
                    create: { uuid: Number(uuid) },
                },
            },
            receiver: {
                connectOrCreate: {
                    where: { uuid: Number(companyUuid?.uuid) },
                    create: { uuid: Number(companyUuid?.uuid) },
                },
            },
            invoice: {
                connectOrCreate: {
                    where: { invoiceId: String(invoiceId) },
                    create: { invoiceId: String(invoiceId) },
                }
            }
        },
    })


    for (let i: number = 0; i < repaymentPeriod; i++) {
        await prisma.paymentSplit.create({
            data: {
                paymentDate: (currentDate.plus({ month: i })).toJSDate(),
                paymentStatus: 'IP',
                paymentAmount: paymentAmt * repaymentPercent[Number(repaymentPeriod)][i],
                mainPaymentId: data.paymentId
            }
        })
    }

    return res.status(200).json({
        message: "Payment inserted",
        success: true
    })
}