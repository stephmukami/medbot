import bcrypt from 'bcrypt'
import {prisma} from '@/app/lib/prisma'

import { NextResponse } from 'next/server'

export async function POST(request: { json: any }){
    const body = await request.json();
    const { first_name,last_name, email, password } = body;

    if(!first_name || !last_name ||!email || !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            first_name,
            last_name,
            email,
            hashed_password
        }
    });

    return NextResponse.json(user)
}