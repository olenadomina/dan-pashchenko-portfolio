# macOS edition

Separate implementation at `/macos/`; the existing portfolio at `/` is preserved.

## Reference lock

The user explicitly selected the macOS UI system. This is a web implementation of its visual and interaction patterns, not AppKit running in the browser.

Primary: Apple Human Interface Guidelines for [macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos/), [windows](https://developer.apple.com/design/human-interface-guidelines/windows), [sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) and [segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls). Preserve system typography, split-view hierarchy, translucent chrome, compact controls, light grouped surfaces and clear selection states.

Refero style searches returned no results. Screen references inspected: [Kitchen file browser](https://refero.design/pages/ffd5440d-aacc-4cdd-b466-4b35826d872a) for grouped sidebar navigation and icon-led items; [Rise project search](https://refero.design/pages/74b9ded0-c1e1-45a4-a7a3-ff0892ba0c02) for a compact search overlay. Apple remains the governing design system; those secondary references contribute only those patterns.

| Decision | Source / role |
| --- | --- |
| Single window with sidebar, toolbar and status bar | Apple window and sidebar guidance; portfolio sections become collections |
| System `-apple-system` typography, 13px controls and 15px body | macOS system UI, no additional font download |
| #f5f5f7 canvas, white grouped panels, #1d1d1f text | Neutral system surfaces; #007aff limited to actions and selected controls |
| Segmented project selector | Apple single-choice segmented control |
| Original portrait, icons, app screenshots and PDF | Existing reviewed evidence; no invented content |
| Search dialog, theme toggle, minimize/restore and zoom | Functional equivalents of the displayed controls; no dead decorative controls |
| Compact top navigation on mobile | Apple sidebar guidance when screen space is limited |

Preserve original facts and text. Do not import original global CSS. The alternative has its own HTML entry, bundle and scoped component styles. Use reduced-motion overrides and keyboard-visible focus. Verify desktop, mobile, navigation, search, theme, window restoration, resume and original-route preservation before publishing.

## Verification

- Production build and static prerender passed for both entry points.
- Browser checked at desktop, 390 × 844 and 320 × 740; no horizontal overflow.
- Overview app rows select the matching Work segment; segments update details and previews.
- Skills search returns Swift and SwiftUI, supports an empty result and clears back to all 52 skills.
- Light/dark appearance, search dialog navigation/Escape, minimize/restore and expand/restore verified.
- Contact copy reported actual clipboard success in the browser.
- Browser console contained no errors or warnings during the tested flows.
- Original source components and CSS remain unchanged.
