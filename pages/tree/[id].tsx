import { GetServerSideProps } from 'next';
import { MapLayout } from '../../src/components/MapLayout';
import SidebarTree from '../../src/components/Sidebar/SidebarTree';
import { Page } from '../../src/nextPage';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      treeId: query.id,
    },
  };
};

const TreePage: Page<{ treeId?: string | null; }> = ({ treeId }) => <SidebarTree treeId={treeId} />;

TreePage.layout = MapLayout;

export default TreePage;
