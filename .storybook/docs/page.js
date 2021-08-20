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
import { ImportInfo } from './blocks/ImportInfo';
import { BootstrapComponent } from './blocks/BootstrapComponent';

export const page = () => (
  <>
    <Title />
    <Subtitle />
    <ImportInfo />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
    <BootstrapComponent />
  </>
);
