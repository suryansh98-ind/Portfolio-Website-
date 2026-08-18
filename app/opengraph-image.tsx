import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Suryansh Thakur - Product Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const photoData = readFileSync(join(process.cwd(), 'public/suryansh.jpeg'))
  const photo = `data:image/jpeg;base64,${photoData.toString('base64')}`

  let fontData: ArrayBuffer | null = null
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } }
    ).then(r => r.text())
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (url) fontData = await fetch(url).then(r => r.arrayBuffer())
  } catch { /* fall back to system font */ }

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        width: 1200, height: 630,
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0b',
        fontFamily: fontData ? "'Plus Jakarta Sans', sans-serif" : 'sans-serif',
      }}>

        {/* Photo - 800px wide, edge at x=400 (inside 47% plateau at x=423) → no seam */}
        <img src={photo} style={{
          position: 'absolute',
          top: -22, right: 0,
          width: 750, height: 675,
          objectFit: 'cover',
          objectPosition: '0% center',
        }} />

        {/* Gradient - plateau to x=402 (67%) covers photo edge at x=400; fades fully to 0 at x=600 */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 600,
          background: 'linear-gradient(to right, rgba(10,10,11,1) 0%, rgba(10,10,11,1) 76%, rgba(10,10,11,0.85) 83%, rgba(10,10,11,0.58) 90%, rgba(10,10,11,0.25) 95%, rgba(10,10,11,0.06) 98%, rgba(10,10,11,0) 100%)',
          display: 'flex',
        }} />

        {/* Subtle bottom vignette on the right (photo) side only */}
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0, width: 700, height: 120,
          background: 'linear-gradient(to top, rgba(10,10,11,0.4) 0%, transparent 100%)',
          display: 'flex',
        }} />

        {/* ST monogram - top left */}
        <div style={{
          position: 'absolute', top: 44, left: 60,
          display: 'flex', alignItems: 'center',
          fontSize: 22, fontWeight: 800, letterSpacing: -1,
        }}>
          <span style={{ color: '#15C679' }}>S</span>
          <span style={{ color: '#ffffff' }}>T</span>
        </div>

        {/* Left text panel */}
        <div style={{
          position: 'absolute', left: 60, top: 0, bottom: 0, width: 490,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{
            display: 'flex', color: '#60A5FA',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 22,
          }}>
            Product Designer
          </div>

          <div style={{ display: 'flex', color: '#ffffff', fontSize: 80, fontWeight: 800, lineHeight: '0.9', letterSpacing: '-0.03em' }}>
            Suryansh
          </div>
          <div style={{ display: 'flex', color: '#ffffff', fontSize: 80, fontWeight: 800, lineHeight: '0.9', letterSpacing: '-0.03em', marginBottom: 36 }}>
            Thakur
          </div>

          <div style={{ display: 'flex', width: 52, height: 3, background: '#60A5FA', borderRadius: 2, marginBottom: 28 }} />

          <div style={{ display: 'flex', color: '#a1a1aa', fontSize: 17, lineHeight: '1.65', marginBottom: 40, maxWidth: 400 }}>
            End-to-end designer shipping across B2B SaaS, consumer apps, and AI products.
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { name: 'Quantive Results', color: '21,198,121' },
              { name: 'Quantive Signals', color: '65,122,234' },
              { name: 'Kamelion', color: '37,142,91' },
              { name: 'MyHormonz', color: '202,22,112' },
            ].map(({ name, color }) => (
              <div key={name} style={{
                display: 'flex',
                background: `rgba(${color},0.15)`,
                border: `1px solid rgba(${color},0.4)`,
                color: `rgb(${color})`,
                fontSize: 12, fontWeight: 500,
                padding: '5px 14px', borderRadius: 100,
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData ? { fonts: [{ name: 'Plus Jakarta Sans', data: fontData, weight: 800, style: 'normal' as const }] } : {}),
    }
  )
}
