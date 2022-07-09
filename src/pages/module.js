import { gql, useQuery } from '@apollo/client';
import { Layout, ModuleDetail, QueryResult } from '../components';

const GET_MODULE_PAGE_DATA = gql`
  query GetModulePageData($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      modules {
        title
        id
        durationInSeconds
      }
      title
      modulesCount
    }
  }
`;

export default function Module({ trackId, moduleId }) {
  console.log(trackId, moduleId);
  const { loading, error, data } = useQuery(GET_MODULE_PAGE_DATA, {
    variables: {
      trackId,
      moduleId,
    },
  });
  return (
    <Layout fullwidth>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
}
