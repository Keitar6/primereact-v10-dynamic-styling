import {
  dataIntermediateMfeElementKey,
  dataIntermediateNoPortalLayoutStylesKey,
  dataIntermediateStyleIdKey,
  dataMfeElementKey,
  dataNoPortalLayoutStylesKey,
  dataStyleIdKey,
} from '../../../constants/styleAttributes';
import { StyleData } from '../types';
import { findElementWithStyleDataOrIntermediateStyleData } from './findElementWithStyleDataOrIntermediateStyleData';

/**
 * Gets the style data from an element or its intermediate style data if it exists.
 * @param element HTMLElement to get style data from
 * @returns StyleData object or null if no style data is found.
 */
export function getStyleDataOrIntermediateStyleData(
  element: Node | EventTarget,
): StyleData | null {
  const styleElement = findElementWithStyleDataOrIntermediateStyleData(element);
  if (!styleElement || styleElement.dataset[dataStyleIdKey] === 'shell-ui')
    return null;

  return {
    dataIntermediateStyleIdKey:
      styleElement.dataset[dataStyleIdKey] ??
      styleElement.dataset[dataIntermediateStyleIdKey],
    dataIntermediateNoPortalLayoutStylesKey:
      styleElement.dataset[dataNoPortalLayoutStylesKey] ??
      styleElement.dataset[dataIntermediateNoPortalLayoutStylesKey],
    dataIntermediateMfeElementKey:
      styleElement.dataset[dataMfeElementKey] ??
      styleElement.dataset[dataIntermediateMfeElementKey],
  };
}
