import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const testUrl = 'https://proxy.afterdark.click/1156594/playlist.m3u8';
    
    console.log('Testing afterdark bypass connection...');
    console.log('Test URL:', testUrl);
    
    // Tester le nouveau proxy de contournement
    const bypassUrl = `/api/proxy/afterdark-bypass?url=${encodeURIComponent(testUrl)}`;
    
    const response = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}${bypassUrl}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      signal: AbortSignal.timeout(30000),
      redirect: 'follow'
    });
    
    console.log('Bypass response status:', response.status);
    console.log('Bypass response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: `Bypass failed: ${response.status} ${response.statusText}`,
        bypassUrl: bypassUrl
      });
    }
    
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    return NextResponse.json({
      success: true,
      status: response.status,
      contentType,
      contentLength,
      headers: Object.fromEntries(response.headers.entries()),
      message: 'Afterdark bypass connection successful',
      bypassUrl: bypassUrl
    });
    
  } catch (error) {
    console.error('Bypass test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.name : 'Unknown',
      message: 'Afterdark bypass connection failed'
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
