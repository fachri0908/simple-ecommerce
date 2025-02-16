import { useState, useEffect, useRef } from "react";
import Trolley from '../assets/trolley.svg';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <img
            ref={imgRef}
            src={isLoaded ? src : Trolley}
            alt={alt}
            className={className}
        />
    );
};

export default LazyImage;
