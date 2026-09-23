/**
 * Fonts for generated preview images.
 *
 * next/og ships only a Latin face, so Korean, Japanese and Thai render as
 * boxes unless a font is supplied. Google Fonts' `text=` parameter returns a
 * subset holding exactly the characters the card uses — a few kilobytes
 * instead of megabytes. Requested without a browser user agent, the CSS API
 * answers with TrueType, which is what the renderer reads.
 */
export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

export async function loadGoogleFont(
  family: string,
  weight: 400 | 700,
  text: string
): Promise<OgFont | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return { name: family, data: await res.arrayBuffer(), weight, style: "normal" };
  } catch {
    return null;
  }
}
