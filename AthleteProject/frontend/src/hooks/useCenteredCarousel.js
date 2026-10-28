import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent } from "framer-motion";

export default function useCenteredCarousel(initialIndex = 0) {
    const viewportRef = useRef(null); // visible, overflow-hidden window
    const trackRef = useRef(null); // the draggable row
    const cardRefs = useRef([]);
    const hasPositioned = useRef(false);

    const x = useMotionValue(0);
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [bounds, setBounds] = useState({ left: 0, right: 0 });

    // Highlight the card whose real on-screen centre is closest to the
    // centre of the visible carousel.
    const updateActiveCard = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const rect = viewport.getBoundingClientRect();
        const viewportCenter = rect.left + rect.width / 2;

        let closest = 0;
        let minDistance = Infinity;

        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const r = card.getBoundingClientRect();
            const distance = Math.abs(r.left + r.width / 2 - viewportCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closest = i;
            }
        });

        setActiveIndex((prev) => (prev === closest ? prev : closest));
    }, []);

    // Recompute while dragging (and during any programmatic x change)
    useMotionValueEvent(x, "change", updateActiveCard);

    // Measure real card positions -> drag limits that let the first AND last
    // card reach the centre. Also places the initial card in the centre.
    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const measure = () => {
            const cards = cardRefs.current.filter(Boolean);
            if (!cards.length) return;

            const half = viewport.clientWidth / 2;
            const centerOf = (el) => el.offsetLeft + el.offsetWidth / 2;

            const right = Math.max(0, half - centerOf(cards[0]));
            const left = Math.min(0, half - centerOf(cards[cards.length - 1]));
            setBounds({ left, right });

            if (!hasPositioned.current) {
                hasPositioned.current = true;
                const start = half - centerOf(cards[initialIndex]);
                x.set(Math.min(right, Math.max(left, start)));
            } else {
                x.set(Math.min(right, Math.max(left, x.get())));
            }
            updateActiveCard();
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(viewport);
        return () => ro.disconnect();
    }, [x, updateActiveCard, initialIndex]);

    // Ref callback factory for each card
    const setCardRef = useCallback(
        (index) => (el) => {
            cardRefs.current[index] = el;
        },
        []
    );

    return { viewportRef, trackRef, x, bounds, activeIndex, setCardRef };
}