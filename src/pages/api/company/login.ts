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
        return await login(req, res);
    }

    return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
}

const login = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.json({ result: "Email or Password required" })
    }

    const data = await prisma.business.findFirst({
        where: {
            email: email,
            password: password
        }
    })

    if (!data) {
        return res.status(404).json({
            message: "Login failed",
            success: false
        })
    }

    return res.status(200).json({
        message: "Login success",
        success: true
    })
}