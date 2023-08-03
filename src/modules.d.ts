declare module '*.svg' {
    import React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<
        SVGSVGElement
        > & { title?: string }>;

    const src: string;
    export default src;
}

declare module "*.jpg" {
    export default "" as string;
}
declare module "*.png" {
    export default "" as string;
}
declare module "*.json" {
    export default "" as any;
}
declare global {
    interface Window {
        M: any;
    }
}
