import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { ImportInfo, BootstrapComponent, LinkToSource } from './blocks';

export const page = () => (
  <>
    <div className="gl-display-flex gl-align-items-center">
      <Title />
      <LinkToSource className="gl-ml-auto!" />
    </div>
    <Subtitle />
    <ImportInfo />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
    <BootstrapComponent />
  </>
);
