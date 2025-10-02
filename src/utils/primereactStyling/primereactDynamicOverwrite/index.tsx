import { isValidElement, cloneElement } from 'react';
import * as ReactDOM from 'react-dom';

import { getOnecxTriggerElement } from '../../globalFunctions/onecx-trigger-element';
import { getStyleDataOrIntermediateStyleData } from './functions/getStyleDataOrIntermediateStyleData';
import { appendIntermediateStyleData } from './functions/appendIntermediateStyleData';

const originalCreatePortal = ReactDOM.createPortal;
(function ensurePrimereactDynamicDataIncludesIntermediateStyleData() {
  (ReactDOM as any).createPortal = function (
    children: any,
    container: any,
    ...rest: any
  ) {
    let patchedChildren = children.props.children;
    const onecxTrigger = getOnecxTriggerElement();
    if (
      onecxTrigger &&
      (patchedChildren.props.className as string).includes('p-') // PrimeReact classes start with 'p-'
    ) {
      const styleData = onecxTrigger
        ? getStyleDataOrIntermediateStyleData(onecxTrigger)
        : null;

      if (isValidElement(patchedChildren)) {
        const intermediateStyleData = styleData
          ? appendIntermediateStyleData(styleData)
          : {};

        // console.log('🔧 Portal patching debug:', {
        //   patchedChildren,
        //   originalClassName: patchedChildren.props.classNames,
        //   childrenProps: children.props.classNames,
        //   styleData,
        //   intermediateStyleData,
        // });

        // Append intermediate data so the isolation does not happen by coincidence
        patchedChildren = cloneElement(patchedChildren, {
          ...(children as any).props,
          ...intermediateStyleData,
        });

        // console.log('🔧 After patching:', {
        //   patchedProps: (patchedChildren as any).props,
        // });
      }
    }

    console.log('🚀 Final result - patchedChildren: ', {
      patchedChildren,
      container,
      ...rest,
    });

    return originalCreatePortal(
      { ...children, props: { ...children.props, children: patchedChildren } },
      container,
      ...rest,
    );
  };
})();
