import { Children, cloneElement, isValidElement } from 'react';

const NBSP = '\u00a0';

export function typeset(text) {
  return text
    .replace(/(?<![\p{L}\p{N}_’'-])([\p{L}]{1,3}|I[’'](?:m|ve|ll|d)|with|from|that|this|your|into|onto|over|than|then)[ \t]+/giu, `$1${NBSP}`)
    .replace(/(?<=\d)[ \t]+(?=\d)/g, NBSP)
    .replace(/(?<![\p{L}\p{N}_])(\d[\d\u00a0.,]*(?:\+|%|°)?)[ \t]+(?=[\p{L}\p{N}€$£₴])/gu, `$1${NBSP}`)
    .replace(/[ \t]+(?=[—–])/g, NBSP);
}

function formatChildren(children) {
  return Children.map(children, child => {
    if (typeof child === 'string') return typeset(child);
    if (!isValidElement(child) || !child.props.children) return child;
    if (['pre', 'code', 'svg'].includes(child.type) || child.props['aria-hidden']) return child;
    return cloneElement(child, {}, formatChildren(child.props.children));
  });
}

// Keep links, emphasis and semantic markup intact while typesetting text nodes.
export default function Typographic({ children }) {
  return formatChildren(children);
}
