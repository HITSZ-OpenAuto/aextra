import { useEffect } from "react";

interface Props {
    titleId?: string;
}

function isDescendant(parent: HTMLElement, child: Node) {
    return parent && child && parent.contains(child);
}

function toggleSharpBtn(sharpBtn: HTMLElement) {
    if (!sharpBtn) return;

    if (sharpBtn.classList.contains('opacity-20')) {
        sharpBtn.classList.remove('opacity-20');
        sharpBtn.classList.add('opacity-0');
    } else if (sharpBtn.classList.contains('opacity-0')) {
        sharpBtn.classList.remove('opacity-0');
        sharpBtn.classList.add('opacity-20');
    }
}

function scrollToSharpBtn(sharpBtn: HTMLElement) {
    if (!sharpBtn) return;
    const rect = sharpBtn.getBoundingClientRect();
    const navBar = document.querySelector<HTMLElement>('.nav-bar');
    const navBarOffset = navBar ? navBar.offsetHeight : 0;
    const dist = rect.top + window.pageYOffset - navBarOffset - 10;
    window.scrollTo({ top: Math.max(0, dist), behavior: 'smooth' });
}

export default function SharpButtonEffect({ titleId }: Props) {
    useEffect(() => {
        if (!titleId) throw new Error("titleId is null value");
        const parent: HTMLElement | null | undefined = document.getElementById(titleId)?.parentElement;
        if (!parent) throw new Error(`Element with id ${titleId} not found`);
        let currentSharpBtn: HTMLElement | null = null;

        const handleClick = (e: PointerEvent) => {
            console.log('click event detected');
            const lists = parent.querySelectorAll<HTMLElement>('.link-list');
            for (const list of lists) {
                if (isDescendant(list, e?.target as Node)) {
                    const sharpBtn = list.querySelector<HTMLElement>('.sharp-btn');
                    if (!sharpBtn) continue;
                    if (sharpBtn && isDescendant(sharpBtn, e?.target as Node)) {
                        toggleSharpBtn(sharpBtn);
                        if (currentSharpBtn) toggleSharpBtn(currentSharpBtn);
                        currentSharpBtn = sharpBtn;
                    }
                    scrollToSharpBtn(sharpBtn);
                    console.log('Sharp button clicked and scrolled into view');
                    break;
                }
            }
        };

        parent.addEventListener("click", handleClick);

        return () => {
            parent.removeEventListener("click", handleClick);
        };
    }, [titleId]);

    return null;
};