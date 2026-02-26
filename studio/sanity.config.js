import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '../sanity/schemaTypes';

const singletonTypes = new Set(['homepage', 'footer']);

export default defineConfig({
    name: 'default',
    title: 'The Ring Experience CMS',
    projectId: 'a65qlod9',
    dataset: 'production',
    apiVersion: '2024-01-01',
    basePath: '/admin',
    plugins: [structureTool()],
    document: {
        actions: (prev, context) => (
            singletonTypes.has(context.schemaType)
                ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
                : prev
        )
    },
    schema: {
        types: schemaTypes
    }
});
