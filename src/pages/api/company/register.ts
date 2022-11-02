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
    if (req.method === "POST") {
        return await signup(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const signup = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let { email, password, companyName, uenNo } = req.body

    if (!email || !password) {
        return res.json({ result: "Email or Password required" })
    }

    let data = await prisma.business.findFirst({
        where: {
            email: email
        }
    })

    if (data) {
        return res.status(400).json({
            message: "Email is used",
            success: false
        })
    }

    data = await prisma.business.create({
        data: {
            email: email,
            password: password,
            companyName: companyName,
            uenNo: uenNo
        }
    })

    if (!data) {
        return res.status(404).json({
            message: "Sign up failed",
            success: false
        })
    }

    return res.status(200).json({
        message: "Sign up success",
        uuid: data.uuid,
        success: true
    })
}