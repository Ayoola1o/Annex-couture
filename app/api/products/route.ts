import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_PRODUCTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = {
      ...body,
      id: `annex-${Date.now().toString().slice(-4)}`,
    };
    return NextResponse.json({
      success: true,
      data: newProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
