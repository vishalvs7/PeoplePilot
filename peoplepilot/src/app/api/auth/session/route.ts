import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('session')?.value;
    
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    
    // TODO: Verify Firebase session token
    // For now, return mock data
    return NextResponse.json({
      user: {
        id: 'mock-user-id',
        email: 'test@company.com',
        role: 'hr_admin',
        companyId: 'default-company',
      }
    });
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}