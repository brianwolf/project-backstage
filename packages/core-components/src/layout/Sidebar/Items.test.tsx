/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { renderInTestApp } from '@backstage/test-utils';
import { createEvent, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeIcon from '@material-ui/icons/Home';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import { Sidebar } from './Bar';
import { SidebarItem, SidebarSearchField, SidebarExpandButton } from './Items';
import { renderHook } from '@testing-library/react-hooks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spotlight: {
    backgroundColor: '#2b2a2a',
  },
});

async function renderSidebar() {
  const { result } = renderHook(() => useStyles());

  await renderInTestApp(
    <Sidebar>
      <SidebarSearchField onSearch={() => {}} to="/search" />
      <SidebarItem text="Home" icon={HomeIcon} to="./" />
      <SidebarItem
        icon={CreateComponentIcon}
        onClick={() => {}}
        text="Create..."
        className={result.current.spotlight}
      />
      <SidebarExpandButton />
    </Sidebar>,
  );
  await userEvent.hover(screen.getByTestId('sidebar-root'));
}

describe('Items', () => {
  beforeEach(async () => {
    await renderSidebar();
  });

  describe('SidebarItem', () => {
    it('should render a link when `to` prop provided', async () => {
      expect(
        await screen.findByRole('link', { name: /home/i }),
      ).toBeInTheDocument();
    });

    it('should render a button when `to` prop is not provided', async () => {
      expect(
        await screen.findByRole('button', { name: /create/i }),
      ).toBeInTheDocument();
    });

    it('should render a button with custom style', async () => {
      expect(
        await screen.findByRole('button', { name: /create/i }),
      ).toHaveStyle(`background-color: transparent`);
    });
  });
  describe('SidebarSearchField', () => {
    it('should be defaultPrevented when enter is pressed', async () => {
      const searchEvent = createEvent.keyDown(
        await screen.findByPlaceholderText('Search'),
        { key: 'Enter', code: 'Enter', charCode: 13 },
      );
      fireEvent(await screen.findByPlaceholderText('Search'), searchEvent);
      expect(searchEvent.defaultPrevented).toBeTruthy();
    });
  });
});
