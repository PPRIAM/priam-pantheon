# Visual Design & Premium UI/UX Guidelines for PRIAM

Always implement the following advanced CSS and SVG patterns to maintain the premium dark-tech aesthetic of the Priam Pantheon site:

## 1. Conic-Gradient Laser Borders (Angle B)
- **Problem**: Adding standard borders to elements with `backdrop-filter: blur` can break the browser's compositing or overlap the border color.
- **Solution**: 
  - Wrap the content in a container with a relative layout and absolute inset elements.
  - Create a rotating laser effect using a pseudo-element or sibling overlay with `bg-[conic-gradient(from_0deg,transparent_50%,#BEFF39_80%,#BEFF39_100%)]`.
  - Animate the rotation infinitely (e.g. 4 seconds) using a GSAP tween on `rotate` or a CSS animation.
  - Mask the center using a rounded child container positioned at `inset-[1.5px]` with your target background color (e.g., `#050505/90`) and `backdrop-blur`.

## 2. Image Masking & Drop Shadow Compatibility
- **Problem**: When a portrait image has a glowing contour (`filter: drop-shadow`), applying a bottom mask should fade out BOTH the image and the glow smoothly.
- **Solution**:
  - Apply the transparency mask (`mask-image` and `-webkit-mask-image` linear-gradient) directly on the `img` element (or fallback `svg` path), rather than on the parent container.
  - Set the `drop-shadow` filter on the parent wrapper container. The browser will compute the drop shadow from the masked image alpha channel, causing the shadow to fade out at the bottom in perfect sync with the portrait.

## 3. Responsive Curviligne Text Scroll (SVG textPath + GSAP)
- **Problem**: Wrapping text around arbitrary silhouette shapes in a responsive, fluid manner.
- **Solution**:
  - Use an SVG element with `viewBox="0 0 W H"` and `className="w-full h-full"` so it scales proportionally with its container.
  - Define a curve using `<path id="curve-id" d="..." fill="none" stroke="transparent" />`.
  - Use `<text>` and `<textPath href="#curve-id">` to bind the text to the curve.
  - Animate the text infinitely along the path by tweening the `startOffset` attribute from `0%` to `-100%` with linear ease (`ease: "none"`) in GSAP.

## 4. Editorial Superposition & Z-Indexing
- **Problem**: Creating large, overlapping editorial blocks without breaking readability or mouse interactions.
- **Solution**:
  - Set explicit z-indexes on grid columns: `relative z-20` on the text description column, and `relative z-10` on the background/image column.
  - Use negative margins (`-ml-12`, `-mr-12`) to allow the larger asset column to slide under the text safely.
