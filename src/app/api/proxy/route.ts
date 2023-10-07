import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const JMAWarningsRes = await fetch(
    'https://www.jma.go.jp/bosai/warning/data/warning/map.jsonn'
  );
  const newJMAWarnings = await JMAWarningsRes.json();

  return NextResponse.json({
    newJMAWarnings,
  });
}
