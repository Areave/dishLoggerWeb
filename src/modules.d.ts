declare module '*.svg' {
    import * as React from 'react';

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
declare global {
    interface Window {
        M: any;
    }
}
