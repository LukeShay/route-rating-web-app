import React from 'react';
import { StandardProps } from '../standardProps';
import { Events } from '../../../types';

export interface ButtonProps extends StandardProps {
  component?: React.ElementType;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  onClick?(event: Events.ButtonEvent): void | Promise<void>;
}
