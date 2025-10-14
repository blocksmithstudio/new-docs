/* eslint-disable @next/next/no-img-element */
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import type { Root, Separator } from 'fumadocs-core/page-tree';

export default function Layout({ children }: { children: ReactNode }) {
  const opts = baseOptions;

  const originalTree = source.pageTree;

  const sep1: Separator = { type: 'separator', name: 'Introduction' };
  const sep2: Separator = { type: 'separator', name: 'Other Section' };

  const newChildren = originalTree.children.slice();

  newChildren.splice(0, 0, sep1);

  newChildren.splice(2, 0, sep2);  // adjust accordingly

  const modifiedTree: Root = {
    ...originalTree,
    children: newChildren,
  };

  return (
    <DocsLayout
      sidebar={{
        tabs: [
          {
            title: 'Blocksmith',
            url: '/',
            icon: (
              <img
                src="/img/logo.png"
                alt="Blocksmiths logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextAnnouncers',
            url: '/NextAnnouncers',
            icon: (
              <img
                src="/img/lsz.svg"
                alt="LifeStealZ logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'PlayerProfiles',
            url: '/PlayerProfiles',
            icon: (
              <img
                src="/img/slz.svg"
                alt="ServerLinksZ logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'AvatarDonation',
            url: '/AvatarDonation',
            icon: (
              <img
                src="/img/ccz.svg"
                alt="CookieClickerZ Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextGens',
            url: '/NextGens',
            icon: (
              <img
                src="/img/NextGens.png"
                alt="NextGens Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextCollectors',
            url: '/NextCollectors',
            icon: (
              <img
                src="/img/NextCollectors.png"
                alt="NextCollectors Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextCoinFlip',
            url: '/NextCoinFlip',
            icon: (
              <img
                src="/img/NextCoinflip.png"
                alt="NextCoinFlip Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
        ],
        // You can also re-add transforms or other options if needed
      }}
      {...opts}
      tree={modifiedTree}
    >
      {children}
    </DocsLayout>
  );
}
