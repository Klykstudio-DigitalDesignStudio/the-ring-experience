export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Hero',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string' },
                { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/bookexperience' },
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
            ]
        },
        {
            name: 'aMoment',
            title: 'A Moment',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'paragraphOne', title: 'Paragraph One', type: 'text', rows: 3 },
                { name: 'paragraphTwo', title: 'Paragraph Two', type: 'text', rows: 3 },
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
            ]
        },
        {
            name: 'experienceCards',
            title: 'Experience Cards',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'key', title: 'Key', type: 'string' },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'lineOne', title: 'Line One', type: 'string' },
                    { name: 'lineTwo', title: 'Line Two', type: 'string' },
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
                ]
            }],
            options: {
                disableActions: ['add', 'remove', 'duplicate', 'copy']
            },
            validation: (Rule) => Rule.min(3).max(3)
        },
        {
            name: 'values',
            title: 'Values',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
                {
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'title', title: 'Title', type: 'string' },
                            { name: 'text', title: 'Text', type: 'text', rows: 3 }
                        ]
                    }],
                    options: {
                        disableActions: ['add', 'remove', 'duplicate', 'copy']
                    },
                    validation: (Rule) => Rule.min(4).max(4)
                }
            ]
        },
        {
            name: 'followUs',
            title: 'Follow Us',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
                {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'label', title: 'Label', type: 'string' },
                            { name: 'href', title: 'URL', type: 'url' }
                        ]
                    }],
                    options: {
                        disableActions: ['duplicate', 'copy']
                    }
                }
            ]
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'sourceLabel', title: 'Source Label', type: 'string' },
                { name: 'sourceUrl', title: 'Source URL', type: 'url' },
                {
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'author', title: 'Author', type: 'string' },
                            { name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
                            { name: 'text', title: 'Text', type: 'text', rows: 4 },
                            { name: 'dateLabel', title: 'Date Label', type: 'string' }
                        ]
                    }],
                    options: {
                        disableActions: ['duplicate', 'copy']
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'hero.headline'
        },
        prepare({ title }) {
            return { title: title || 'Homepage' };
        }
    }
};
