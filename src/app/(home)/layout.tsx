import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import type { Root, Separator } from "fumadocs-core/page-tree";

// import meta.json di root yang berisi folder-folder plugin
import metaRoot from "../../../content/docs/meta.json"; // sesuaikan path-nya


export default function Layout({ children }: { children: ReactNode }) {
  const options = baseOptions;
  const originalTree = source.pageTree;

  // urutan target berdasarkan meta.json (key order)
  const desiredOrder = Object.keys(metaRoot as Record<string, unknown>);

  const getName = (node: any) =>
    node?.entry?.name || node?.name || node?.title || "";

  // 1) ambil node "Blocksmith" (nama persis di sidebar)
  const blocksmithNode = originalTree.children.find(
    (n: any) => getName(n) === "Blocksmith"
  );

  // 2) sisanya (tanpa Blocksmith)
  const others = originalTree.children.filter((n: any) => n !== blocksmithNode);

  // 3) urutkan "others" sesuai meta.json
  const sortedOthers = [...others].sort((a: any, b: any) => {
    const indexA = desiredOrder.indexOf(getName(a));
    const indexB = desiredOrder.indexOf(getName(b));
    const safeA = indexA === -1 ? Number.POSITIVE_INFINITY : indexA;
    const safeB = indexB === -1 ? Number.POSITIVE_INFINITY : indexB;
    return safeA - safeB;
  });

  // 4) sisipkan separator & rakit final tree:
  //    Introduction → Blocksmith → Other Section → (folder lain sesuai meta)
  const sepIntro: Separator = { type: "separator", name: "Introduction" };
  const sepPaid:  Separator = { type: "separator", name: "Paid Plugins" };
  const sepFree:  Separator = { type: "separator", name: "Free Plugins" };

  // ️✅ Tentukan mana yang Free (nama HARUS sama persis dengan yang tampil di tree)
  const freePlugins = new Set<string>([
    "AvatarDonation",
    "PlayerProfiles",
    "NextAnnouncers",
    // tambahin di sini kalau ada plugin gratis lain:
    // "NextCoinFlip",
    // "NextGens",
  ]);

  // Partisi node sesuai kategori (urutan aslinya dipertahankan)
  const paidNodes: any[] = [];
  const freeNodes: any[] = [];

  for (const node of sortedOthers) {
    const name = getName(node);
    (freePlugins.has(name) ? freeNodes : paidNodes).push(node);
  }

  // Rakit final: Introduction → Blocksmith → Paid → Free
  const newChildren: any[] = [sepIntro];
  if (blocksmithNode) newChildren.push(blocksmithNode);
  newChildren.push(sepPaid, ...paidNodes, sepFree, ...freeNodes);

  const modifiedTree: Root = { ...originalTree, children: newChildren };

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
            url: '/NextAnnouncers/',
            icon: (
              <img
                src="/img/nextannouncers.png"
                alt="NextAnnouncers Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'PlayerProfiles',
            url: '/PlayerProfiles/features',
            icon: (
              <img
                src="/img/playerprofiles.jpeg"
                alt="PlayerProfiles Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'AvatarDonation',
            url: '/AvatarDonation/features',
            icon: (
              <img
                src="/img/avatardonation.jpeg"
                alt="AvatarDonation Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextGens',
            url: '/NextGens/features',
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
            url: '/NextCollectors/features',
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
            url: '/NextCoinFlip/features',
            icon: (
              <img
                src="/img/NextCoinflip.png"
                alt="NextCoinFlip Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextCredits',
            url: '/NextCredits/features',
            icon: (
              <img
                src="/img/NextCredits.png"
                alt="NextCredits Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
        ],
        // You can also re-add transforms or other options if needed
      }}
      {...options}
      tree={modifiedTree}
    >
      {children}
    </DocsLayout>
  );
}
