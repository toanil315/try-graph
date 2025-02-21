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
    // Generate base types in `types.ts`
    'src/generated/types.ts': {
      documents: 'src/entities/**/graphql/*.{gql,graphql}',
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: true,
      },
    },

    // Generate operations and ensure proper type imports
    'src/generated/schemas.ts': {
      documents: 'src/entities/**/graphql/*.{gql,graphql}',
      preset: 'import-types',
      presetConfig: {
        typesPath: './types',
      },
      plugins: ['typescript-react-apollo'],
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
