import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`${process.env.VITE_API_URL}`]: {},
    },
  ],
  config: {
    namingConvention: {
      transformUnderscore: true,
    },
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix', 'prettier --write'],
  },
  generates: {
    'src/generated/schemas.tsx': {
      documents: 'src/entities/**/graphql/*.{gql,graphql}',
      plugins: ['typescript', 'typescript-react-apollo', 'typescript-operations'],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
        withRefetchFn: true,
        skipTypename: true,
      },
    },
  },
};

export default config;
