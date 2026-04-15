export const routeOptions = [
    { title: 'Home (/)', value: '/' },
    { title: 'Our Offers (/ouroffers)', value: '/ouroffers' },
    { title: 'Book Experience (/bookexperience)', value: '/bookexperience' },
    { title: 'About Us (/aboutus)', value: '/aboutus' },
    { title: 'Gemstones (/gemstones)', value: '/gemstones' },
    { title: 'Gallery (/gallery)', value: '/gallery' },
    { title: 'FAQ (/faq)', value: '/faq' },
    { title: 'Privacy Policy (/privacy-policy)', value: '/privacy-policy' },
    { title: 'Cookie Policy (/cookie-policy)', value: '/cookie-policy' }
];

export const routeField = ({ name, title, initialValue = '/' }) => ({
    name,
    title,
    type: 'string',
    initialValue,
    options: {
        list: routeOptions
    },
    validation: (Rule) => Rule.required()
});
