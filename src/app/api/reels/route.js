import { generateCelebrityReel } from '@/lib/generateReel';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { celebrity } = await request.json();
  
  try {
    const reel = await generateCelebrityReel(celebrity);
    return NextResponse.json({ reel });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate reel' },
      { status: 500 }
    );
  }
}
