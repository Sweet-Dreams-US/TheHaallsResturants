# Reference Media — drop zone for real Don Hall's photos

Drop real photos in here. I'll upload them to Higgsfield and use them as reference media so the regenerated hero/gallery imagery matches the actual restaurants.

## How to use

1. Drop photos in the folder matching the restaurant (e.g. `the-gas-house/`)
2. Tell me **"reference media is ready — regenerate"** (or list specific restaurants)
3. I'll upload to Higgsfield, then re-run image generation with `nano_banana_2` (top-quality image-to-image) using your photos as the `image` role reference
4. New images replace the originals in `public/images/restaurants/`

Filenames don't matter. Any common image format works (jpg, png, webp, heic).

## What kind of photos help most

In **rough priority order** for each restaurant:

1. **Exterior at dusk/golden hour** — gives Higgsfield the building shape, signage, and architectural details
2. **Interior wide shot** — captures palette, lighting, materials (wood/brass/leather/etc.)
3. **Signature dish on a plate** — food photography only works when it looks like *your* food
4. **Detail shots** — neon sign close-up, the torch at The Factory, stained glass at The Tavern, hibachi grill at Takaoka
5. **The bar** — bartender's-view shots are great for cocktail moments

**1-3 photos per restaurant is the sweet spot.** More references constrain creativity; fewer leaves too much to imagination. If you have to pick one, pick the exterior.

## What I can do with each

| Folder | What I'll regenerate |
|---|---|
| `the-gas-house/`, `the-tavern/`, etc. | The hero image for that restaurant page (replaces the AI-generated one) |
| `family-archive/` | Vintage portraits + meat-market shots for the Story page timeline (1918, 1946, etc.) — drop scans of old family photos here |
| `logos/` | The Don Hall's logo, individual restaurant marks — I'll bake them into nav, footer, signage compositions |
| `food-shots/` | Signature dishes — I'll generate matching plated-food gallery shots that look like your real menu items |

## Quality tips

- **Higher resolution = better.** Higgsfield handles 4K+ great. Don't shrink before sharing.
- **Avoid heavy filters/edits.** Raw photos give the model more to work with.
- **Multiple angles of the same room are fine** — I'll pick the best per generation.
- **HEIC works** — I'll convert during upload.

## Privacy

These files stay local until you confirm you want them uploaded. Once uploaded to Higgsfield, they live in your private workspace and aren't used for model training.

## Beyond hero images

Once we have references in here, I can also generate:
- **Per-restaurant gallery sections** (3-6 images each: room detail, cocktail close-up, signature dish, exterior at night)
- **Cinematic intro videos** for each restaurant page (Higgsfield supports image-to-video — your hero photo becomes a 5-second cinematic clip)
- **The Story page imagery** — vintage 1946 drive-in shots styled to match real archival photos
- **Marketing studio commercial shots** for Specials and Gift Cards
