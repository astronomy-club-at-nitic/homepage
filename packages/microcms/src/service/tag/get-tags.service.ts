import { convertTag } from '@/converter/tag.converter';
import { client } from '@/infra/client.factory';
import type { MicroCmsTag } from '@/infra/microcms.type';
import { MicroCmsApiEndpoint } from '@/infra/microcms.type';
import type { Tag } from '@/model/tag.model';

export type GetTagsQuery = {
  limit?: number;
  offset?: number;
};

export type GetTagsResponse = {
  tags: Tag[];
  totalCount: number;
  limit: number;
  offset: number;
};

export type GetTags = (query?: GetTagsQuery) => Promise<GetTagsResponse>;

export const getTags: GetTags = async (query) => {
  const microCmsResponse = await client.getList<MicroCmsTag>({
    endpoint: MicroCmsApiEndpoint.TAG,
    queries: {
      ...query,
      fields: ['id', 'name', 'description', 'createdAt', 'publishedAt', 'revisedAt', 'updatedAt'] satisfies Array<keyof MicroCmsTag>,
      orders: '-publishedAt',
    },
  });

  const tags = microCmsResponse.contents.map(convertTag);

  return {
    tags,
    totalCount: microCmsResponse.totalCount,
    limit: microCmsResponse.limit,
    offset: microCmsResponse.offset,
  };
};
