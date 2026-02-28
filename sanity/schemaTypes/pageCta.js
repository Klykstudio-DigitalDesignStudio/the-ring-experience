export default {
    name: 'pageCta',
    title: 'Page CTA',
    type: 'document',
    fields: [
        {
            name: 'home',
            title: 'Home CTA',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/bookexperience' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
            ]
        },
        {
            name: 'about',
            title: 'About CTA',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/bookexperience' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
            ]
        },
        {
            name: 'gemstones',
            title: 'Gemstones CTA',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/bookexperience' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
            ]
        },
        {
            name: 'gallery',
            title: 'Gallery CTA',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/bookexperience' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
            ]
        }
    ],
    preview: {
        prepare() {
            return { title: 'Page CTA' };
        }
    }
};
