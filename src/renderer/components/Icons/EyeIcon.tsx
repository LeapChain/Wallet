import React, {forwardRef} from 'react';
import MdiReactIcon from 'mdi-react/EyeIcon';
import IconWrapper from '@renderer/components/Icons/IconWrapper';
import {IconProps} from '@renderer/components/Icons/types';

const EyeIcon = forwardRef<HTMLDivElement, IconProps>(({size = 24, ...props}, ref) => {
  return (
    <IconWrapper {...props} size={size} ref={ref}>
      <MdiReactIcon data-testid="EyeIcon" size={size} />
    </IconWrapper>
  );
});

export default EyeIcon;