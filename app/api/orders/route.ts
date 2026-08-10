import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_ORDERS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      ...body,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({
      success: true,
      data: newOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
