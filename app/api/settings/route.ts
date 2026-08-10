import { NextResponse } from 'next/server';
import { INITIAL_SETTINGS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_SETTINGS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      data: { ...INITIAL_SETTINGS, ...body },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
