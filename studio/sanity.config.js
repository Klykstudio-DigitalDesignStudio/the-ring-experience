import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '../sanity/schemaTypes';

export default defineConfig({
    name: 'default',
    title: 'The Ring Experience CMS',
    projectId: 'a65qlod9',
    dataset: 'production',
    apiVersion: '2024-01-01',
    plugins: [structureTool()],
    schema: {
        types: schemaTypes
    }
});
