import { onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimations(rootRef, options = {}) {
    const selectors = Array.isArray(options.selectors) && options.selectors.length
        ? options.selectors
        : ['[data-reveal]'];
    const start = options.start || 'top 84%';
    const y = Number.isFinite(options.y) ? options.y : 34;
    const duration = Number.isFinite(options.duration) ? options.duration : 0.8;
    const stagger = Number.isFinite(options.stagger) ? options.stagger : 0.08;
    const once = options.once !== false;

    let animationContext = null;
    let mediaMatcher = null;

    const setupRevealAnimations = () => {
        if (!rootRef.value) return;
        mediaMatcher?.revert();
        animationContext?.revert();

        animationContext = gsap.context(() => {
            mediaMatcher = gsap.matchMedia();

            mediaMatcher.add('(prefers-reduced-motion: reduce)', () => {
                selectors.forEach((selector) => {
                    gsap.set(selector, { clearProps: 'all' });
                });
            });

            mediaMatcher.add('(prefers-reduced-motion: no-preference)', () => {
                selectors.forEach((selector) => {
                    gsap.utils.toArray(selector).forEach((element) => {
                        gsap.from(element, {
                            autoAlpha: 0,
                            y,
                            duration,
                            ease: 'power2.out',
                            stagger,
                            overwrite: 'auto',
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: element,
                                start,
                                toggleActions: once ? 'play none none none' : 'play none none reverse',
                                once
                            }
                        });
                    });
                });
            });
        }, rootRef.value);
    };

    onBeforeUnmount(() => {
        mediaMatcher?.revert();
        animationContext?.revert();
    });

    return { setupRevealAnimations };
}
